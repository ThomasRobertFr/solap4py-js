QUnit.config.reorder = false;

var query = new QueryAPI();

function test24(){
  query.clear();
  query.drill("[Traffic]");
  query.slice("[wrong dimension]", ["[wrong dimension].[2000]","[wrong dimension].[2010]"], false);
  var expected = "SERVER_ERROR";
  console.log("test24");
  resultat = query.execute()["error"];
  deepEqual(resultat, expected, "Tests if an error is returned when the dimension doesn\'t exist");
}

function test25(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[Time].[-3]"], false);

  var expected = "SERVER_ERROR";
  var result = query.execute()["error"];
  equal(result, expected, 'Tests if an error is returned when the member doesn\'t exist');
}

function test26(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[Time].[2000]","[Time].[2001]"], false);

  var expected = {"error":"OK","data":[{"[Measures].[Goods Quantity]":2487192,"[Time]":"[Time].[All Times].[2000]"},{"[Measures].[Goods Quantity]":2687089,"[Time]":"[Time].[All Times].[2001]"}]};
  var result = query.execute();
  deepEqual(expected, result, 'Test execute() on Time dimension');
}

function test27(){
  query.slice("[Zone.Name]", ["[Zone.Name].[France]","[Zone.Name].[Germany]"], false);

  var expected = {"error":"OK","data":[{"[Zone]":"[Zone.Name].[All Zone.Names].[France]","[Measures].[Goods Quantity]":328711,"[Time]":"[Time].[All Times].[2000]"},{"[Zone]":"[Zone.Name].[All Zone.Names].[Germany]","[Measures].[Goods Quantity]":235836,"[Time]":"[Time].[All Times].[2000]"},{"[Zone]":"[Zone.Name].[All Zone.Names].[France]","[Measures].[Goods Quantity]":309792,"[Time]":"[Time].[All Times].[2001]"},{"[Zone]":"[Zone.Name].[All Zone.Names].[Germany]","[Measures].[Goods Quantity]":239232,"[Time]":"[Time].[All Times].[2001]"}]};
  var result = query.execute();
  deepEqual(expected, result, 'Tests execute() on Zone dimension');
}


function test28(){
  query.project("wrong hierarchy");

  var expected = {"error":"OK","data":[{"[Zone]":"[Zone.Name].[All Zone.Names].[France]","[Measures].[Goods Quantity]":328711,"[Time]":"[Time].[All Times].[2000]"},{"[Zone]":"[Zone.Name].[All Zone.Names].[Germany]","[Measures].[Goods Quantity]":235836,"[Time]":"[Time].[All Times].[2000]"},{"[Zone]":"[Zone.Name].[All Zone.Names].[France]","[Measures].[Goods Quantity]":309792,"[Time]":"[Time].[All Times].[2001]"},{"[Zone]":"[Zone.Name].[All Zone.Names].[Germany]","[Measures].[Goods Quantity]":239232,"[Time]":"[Time].[All Times].[2001]"}]};
  var result = query.execute();
  deepEqual(expected, result, 'Tests if when deleting a hierarchy which is not sliced, it does not delete anything');
}

function test29(){
  query.project("[Zone.Name]");

  var expected = {"error":"OK","data":[{"[Measures].[Goods Quantity]":2487192,"[Time]":"[Time].[All Times].[2000]"},{"[Measures].[Goods Quantity]":2687089,"[Time]":"[Time].[All Times].[2001]"}]};
  var result = query.execute();
  deepEqual(expected, result, 'Check if you can delete the aggregated hierarchy [Zone.Name]');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test24.toString(), test24);
  test(test25.toString(), test25);
  test(test26.toString(), test26);
  test(test27.toString(), test27);
  test(test28.toString(), test28);
  test(test29.toString(), test29);
}

runTests();

query.clear();
