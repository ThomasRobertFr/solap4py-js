QUnit.config.reorder = false;

var query = new QueryAPI();

function test14(){
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Cube not specified");
}

function test15(){
  query.drill("wrong cube");
  query.push("[Measures].[Goods Quantity]");
  var result = query.execute();
  var props = Object.keys(result);  
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "SERVER_ERROR", "bad request");
  equal(result["data"], "error test");
}

function test16(){
  query.clear();
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Cube not specified");
}

function test17(){
  query.clear();
  query.drill("[Traffic]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366}]);
}

function test18(){
  query.drill("[Traffic]");
  query.push("wrong measure");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "SERVER_ERROR", "bad request");
  equal(result["data"], "error test");
}

function test19(){
  query.clear();
  query.drill("wrong cube");
  query.push("wrong measure");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "SERVER_ERROR", "bad request");
  equal(result["data"], "error test");
}

function test20(){
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

function test21(){
  query.push("[Measures].[Max Quantity]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Goods Quantity]":43838366},{"[Measures].[Max Quantity]":407391}]);
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test14.toString(), test14);
  test(test15.toString(), test15);
  test(test16.toString(), test16);
  test(test17.toString(), test17);
  test(test18.toString(), test18);
  test(test19.toString(), test19);
  test(test20.toString(), test20);
  test(test21.toString(), test21);

}

runTests();


