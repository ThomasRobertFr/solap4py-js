QUnit.config.reorder = false;

var query = new QueryAPI();

function test32(){
  query.drill("[Sales]");
  query.push("[Measures].[Unit Sales]");
  query.push("[Measures].[Store Cost]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Unit Sales]": 266773},{"[Measures].[Store Cost]": 225627.2336}]);
}

function test33(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997]","[Time].[Year].[1998]"], false);
  query.slice("[Store].[Store Country]", ["[Store].[Store Country].[USA]","[Store].[Store Country].[Canada]"], false);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{
    "[Measures].[Unit Sales]": 266773,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Unit Sales]": 259916,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1998]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Unit Sales]": 46157,
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1998]"
  },
  {
    "[Measures].[Store Cost]": 225627.2336,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Store Cost]": 220645.1136,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1998]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Store Cost]": 39332.5705,
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1998]"
  }
]);
}

function test34(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997].[Q1]","[Time].[Year].[1997].[Q3]"], false);
  var result = query.execute()
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Unit Sales]": 66291,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Unit Sales]": 65848,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q3]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q3]"
  },
  {
    "[Measures].[Store Cost]": 55752.2405,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Store Cost]": 55904.8694,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q3]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q3]"
  }
]);
}

function test35(){
  query.pull("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 55752.2405,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Store Cost]": 55904.8694,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q3]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q3]"
  }
]);
}

function test36(){
  console.log("olol");
  query.slice("[Store]", ["[Store].[Canada]", "[Store].[USA]"], false);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test37(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test38(){
  query.project("[Time]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test39(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997]","[Time].[Year].[1998]"], false);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test40(){
  query.pull("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}


function test41(){
  query.project("[Time]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
  equal(1, 1, '1 == 1');
}

function test42(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
  equal(1, 1, '1 == 1');
}

function test43(){
  query.project("[Store]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test32.toString(), test32);
  test(test33.toString(), test33);
  test(test34.toString(), test34);
  test(test35.toString(), test35);
  test(test36.toString(), test36);
  test(test37.toString(), test37);
  test(test38.toString(), test38);
  test(test39.toString(), test39);
  test(test40.toString(), test40);
  test(test41.toString(), test41);
  test(test42.toString(), test42);
  test(test43.toString(), test43);
}

runTests();


