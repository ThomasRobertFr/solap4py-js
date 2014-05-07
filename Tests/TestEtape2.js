module("Etape 2");

QUnit.config.reorder = false;

var query = new QueryAPI();

function test23(){
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Cube not specified");
}

function test24(){
  query.drill("[wrong cube]");
  query.push("[Measures].[Goods Quantity]");
  var result = query.execute();
  var props = Object.keys(result);  
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "SERVER_ERROR", "bad request");
  equal(result["data"], "Impossible to execute the query");
}

function test25(){
  query.clear();
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Cube not specified");
}

function test26(){
  query.clear();
  query.drill("[Traffic]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test27(){
  query.drill("[Traffic]");
  query.push("[wrong measure]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "SERVER_ERROR", "bad request");
  equal(result["data"], "Impossible to execute the query");
}

function test28(){
  query.clear();
  query.drill("[wrong cube]");
  query.push("[wrong measure]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "SERVER_ERROR", "bad request");
  equal(result["data"], "Impossible to execute the query");
}

function test29(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test30(){
  query.push("[Measures].[Max Quantity]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]": 43838366,"[Measures].[Max Quantity]": 407391}]);
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test23.toString(), test23);
  test(test24.toString(), test24);
  test(test25.toString(), test25);
  test(test26.toString(), test26);
  test(test27.toString(), test27);
  test(test28.toString(), test28);
  test(test29.toString(), test29);
  test(test30.toString(), test30);

}

runTests();


