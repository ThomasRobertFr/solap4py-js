module("Etape 1");

QUnit.config.reorder = false;

var query = new QueryAPI();

QUnit.config.reorder = false;

function test1(){
  var result = query.explore(new Array());
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
}

function test2(){
  var result = query.explore(["wrong schema"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid schema identifier");
}

function test3(){
  var result = query.explore(["Traffic"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Traffic]":{"caption":"Traffic"}});
}

function test4(){
  var result = query.explore(["Traffic", "[wrong cube]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid identifier");
}

function test5(){
  var result = query.explore(["Traffic", "[Traffic]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Measures]": {"caption": "Measures","type": "Measure"},"[Time]": { "caption": "Time","type": "Time"},"[Zone]": {"caption": "Zone","type": "Geometry"}});
}

function test6(){
  var result = query.explore(["Traffic", "[Traffic]", "[wrong dimension]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid identifier");
}

function test7(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Zone.Name]":{"caption":"Zone"},"[Zone.Reference]":{"caption":"Zone"}});
}

function test8(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.wrong]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid identifier");
}

function test9(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]"], true);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"id":"[Zone.Name].[(All)]","list-properties":{},"caption":"(All)"},{"id":"[Zone.Name].[Name0]","list-properties":{"Traffic Cube - Zone.Name Hierarchy - Name0 Level - Geom Property":{"caption":"Geom","type":"Geometry"}},"caption":"Name0"},{"id":"[Zone.Name].[Name1]","list-properties":{"Traffic Cube - Zone.Name Hierarchy - Name1 Level - Geom Property":{"caption":"Geom","type":"Geometry"}},"caption":"Name1"},{"id":"[Zone.Name].[Name2]","list-properties":{"Traffic Cube - Zone.Name Hierarchy - Name2 Level - Geom Property":{"caption":"Geom","type":"Geometry"}},"caption":"Name2"},{"id":"[Zone.Name].[Name3]","list-properties":{"Traffic Cube - Zone.Name Hierarchy - Name3 Level - Geom Property":{"caption":"Geom","type":"Geometry"}},"caption":"Name3"}]);
}

function test10(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[wrong]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["data"], "Invalid identifier");
  notEqual(result["data"], null);
}

function test11(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Zone.Name].[All Zone.Names].[Croatia]":{"caption":"Croatia"},"[Zone.Name].[All Zone.Names].[Switzerland]":{"caption":"Switzerland"},"[Zone.Name].[All Zone.Names].[Cyprus]":{"caption":"Cyprus"},"[Zone.Name].[All Zone.Names].[Portugal]":{"caption":"Portugal"},"[Zone.Name].[All Zone.Names].[France]":{"caption":"France"},"[Zone.Name].[All Zone.Names].[Italy]":{"caption":"Italy"},"[Zone.Name].[All Zone.Names].[United Kingdom]":{"caption":"United Kingdom"},"[Zone.Name].[All Zone.Names].[Finland]":{"caption":"Finland"},"[Zone.Name].[All Zone.Names].[Iceland]":{"caption":"Iceland"},"[Zone.Name].[All Zone.Names].[Slovakia]":{"caption":"Slovakia"},"[Zone.Name].[All Zone.Names].[Belgium]":{"caption":"Belgium"},"[Zone.Name].[All Zone.Names].[Luxembourg]":{"caption":"Luxembourg"},"[Zone.Name].[All Zone.Names].[Turkey]":{"caption":"Turkey"},"[Zone.Name].[All Zone.Names].[Norway]":{"caption":"Norway"},"[Zone.Name].[All Zone.Names].[Slovenia]":{"caption":"Slovenia"},"[Zone.Name].[All Zone.Names].[Austria]":{"caption":"Austria"},"[Zone.Name].[All Zone.Names].[Romania]":{"caption":"Romania"},"[Zone.Name].[All Zone.Names].[Czech Republic]":{"caption":"Czech Republic"},"[Zone.Name].[All Zone.Names].[Malta]":{"caption":"Malta"},"[Zone.Name].[All Zone.Names].[Lithuania]":{"caption":"Lithuania"},"[Zone.Name].[All Zone.Names].[Denmark]":{"caption":"Denmark"},"[Zone.Name].[All Zone.Names].[Estonia]":{"caption":"Estonia"},"[Zone.Name].[All Zone.Names].[The former Yugoslav Republic of Macedonia]":{"caption":"The former Yugoslav Republic of Macedonia"},"[Zone.Name].[All Zone.Names].[Hungary]":{"caption":"Hungary"},"[Zone.Name].[All Zone.Names].[Latvia]":{"caption":"Latvia"},"[Zone.Name].[All Zone.Names].[Germany]":{"caption":"Germany"},"[Zone.Name].[All Zone.Names].[Bulgaria]":{"caption":"Bulgaria"},"[Zone.Name].[All Zone.Names].[Sweden]":{"caption":"Sweden"},"[Zone.Name].[All Zone.Names].[Greece]":{"caption":"Greece"},"[Zone.Name].[All Zone.Names].[Netherlands]":{"caption":"Netherlands"},"[Zone.Name].[All Zone.Names].[Liechtenstein]":{"caption":"Liechtenstein"},"[Zone.Name].[All Zone.Names].[Ireland]":{"caption":"Ireland"},"[Zone.Name].[All Zone.Names].[Poland]":{"caption":"Poland"},"[Zone.Name].[All Zone.Names].[Spain]":{"caption":"Spain"}});
}

function test12(){
 var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]", "[Zone.Name].[France]"], true);
 var props = Object.keys(result);
 equal(props.length, 2, "only error and data alright");
 equal(result["error"], "OK", "no error");
 notEqual(result["data"], null);
 notEqual(result["data"], "Invalid identifier");
 equal(1,2);
}

function test13(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]"], "wrong parameter");
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  notEqual(result["data"], null);
  equal(result["data"], "'withProperties' field not specified or invalid");
}

function testClientRemark1(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]", "[Zone.Name].[All Zone.Names].[France]"], false, 2);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {
  "[Zone.Name].[All Zone.Names].[France].[#null].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[Basse-Normandie]": {
    "caption": "Basse-Normandie"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[Bourgogne]": {
    "caption": "Bourgogne"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[Centre]": {
    "caption": "Centre"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[Champagne-Ardenne]": {
    "caption": "Champagne-Ardenne"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[Haute-Normandie]": {
    "caption": "Haute-Normandie"
  },
  "[Zone.Name].[All Zone.Names].[France].[BASSIN PARISIEN].[Picardie]": {
    "caption": "Picardie"
  },
  "[Zone.Name].[All Zone.Names].[France].[CENTRE-EST].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[CENTRE-EST].[Auvergne]": {
    "caption": "Auvergne"
  },
  "[Zone.Name].[All Zone.Names].[France].[CENTRE-EST].[Rhône-Alpes]": {
    "caption": "Rhône-Alpes"
  },
  "[Zone.Name].[All Zone.Names].[France].[DÉPARTEMENTS D'OUTRE-MER].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[DÉPARTEMENTS D'OUTRE-MER].[Guadeloupe]": {
    "caption": "Guadeloupe"
  },
  "[Zone.Name].[All Zone.Names].[France].[DÉPARTEMENTS D'OUTRE-MER].[Guyane]": {
    "caption": "Guyane"
  },
  "[Zone.Name].[All Zone.Names].[France].[DÉPARTEMENTS D'OUTRE-MER].[Martinique]": {
    "caption": "Martinique"
  },
  "[Zone.Name].[All Zone.Names].[France].[DÉPARTEMENTS D'OUTRE-MER].[Réunion]": {
    "caption": "Réunion"
  },
  "[Zone.Name].[All Zone.Names].[France].[EST].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[EST].[Alsace]": {
    "caption": "Alsace"
  },
  "[Zone.Name].[All Zone.Names].[France].[EST].[Franche-Comté]": {
    "caption": "Franche-Comté"
  },
  "[Zone.Name].[All Zone.Names].[France].[EST].[Lorraine]": {
    "caption": "Lorraine"
  },
  "[Zone.Name].[All Zone.Names].[France].[MÉDITERRANÉE].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[MÉDITERRANÉE].[Corse]": {
    "caption": "Corse"
  },
  "[Zone.Name].[All Zone.Names].[France].[MÉDITERRANÉE].[Languedoc-Roussillon]": {
    "caption": "Languedoc-Roussillon"
  },
  "[Zone.Name].[All Zone.Names].[France].[MÉDITERRANÉE].[Provence-Alpes-Côte d'Azur]": {
    "caption": "Provence-Alpes-Côte d'Azur"
  },
  "[Zone.Name].[All Zone.Names].[France].[NORD - PAS-DE-CALAIS].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[NORD - PAS-DE-CALAIS].[Nord - Pas-de-Calais]": {
    "caption": "Nord - Pas-de-Calais"
  },
  "[Zone.Name].[All Zone.Names].[France].[OUEST].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[OUEST].[Bretagne]": {
    "caption": "Bretagne"
  },
  "[Zone.Name].[All Zone.Names].[France].[OUEST].[Pays de la Loire]": {
    "caption": "Pays de la Loire"
  },
  "[Zone.Name].[All Zone.Names].[France].[OUEST].[Poitou-Charentes]": {
    "caption": "Poitou-Charentes"
  },
  "[Zone.Name].[All Zone.Names].[France].[SUD-OUEST].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[SUD-OUEST].[Aquitaine]": {
    "caption": "Aquitaine"
  },
  "[Zone.Name].[All Zone.Names].[France].[SUD-OUEST].[Limousin]": {
    "caption": "Limousin"
  },
  "[Zone.Name].[All Zone.Names].[France].[SUD-OUEST].[Midi-Pyrénées]": {
    "caption": "Midi-Pyrénées"
  },
  "[Zone.Name].[All Zone.Names].[France].[ÎLE DE FRANCE].[#null]": {
    "caption": "#null"
  },
  "[Zone.Name].[All Zone.Names].[France].[ÎLE DE FRANCE].[Île de France]": {
    "caption": "Île de France"
  }
});
}

function testSliceRange(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[Time].[2000]","[Time].[2010]"], true);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Goods Quantity]": 2487192,
    "[Time]": "[Time].[All Times].[2000]"
  },
  {
    "[Measures].[Goods Quantity]": 2687089,
    "[Time]": "[Time].[All Times].[2001]"
  },
  {
    "[Measures].[Goods Quantity]": 2949823,
    "[Time]": "[Time].[All Times].[2002]"
  },
  {
    "[Measures].[Goods Quantity]": 3047672,
    "[Time]": "[Time].[All Times].[2003]"
  },
  {
    "[Measures].[Goods Quantity]": 3178457,
    "[Time]": "[Time].[All Times].[2004]"
  },
  {
    "[Measures].[Goods Quantity]": 3347879,
    "[Time]": "[Time].[All Times].[2005]"
  },
  {
    "[Measures].[Goods Quantity]": 3441504,
    "[Time]": "[Time].[All Times].[2006]"
  },
  {
    "[Measures].[Goods Quantity]": 3541560,
    "[Time]": "[Time].[All Times].[2007]"
  },
  {
    "[Measures].[Goods Quantity]": 3838746,
    "[Time]": "[Time].[All Times].[2008]"
  },
  {
    "[Measures].[Goods Quantity]": 3397128,
    "[Time]": "[Time].[All Times].[2009]"
  },
  {
    "[Measures].[Goods Quantity]": 3601643,
    "[Time]": "[Time].[All Times].[2010]"
  }
]);
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test1.toString(), test1);
  test(test2.toString(), test2);
  test(test3.toString(), test3);
  test(test4.toString(), test4);
  test(test5.toString(), test5);
  test(test6.toString(), test6);
  test(test7.toString(), test7);
  test(test8.toString(), test8);
  test(test9.toString(), test9);
  test(test10.toString(), test10);
  test(test11.toString(), test11);
  test(test12.toString(), test12);
  test(test13.toString(), test13);
  test(testClientRemark1.toString(), testClientRemark1);
  test(testSliceRange.toString(), testSliceRange);
}

runTests();




