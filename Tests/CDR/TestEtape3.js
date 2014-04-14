QUnit.config.reorder = false;

var query = new QueryAPI();
query.clear();
query.drill("[Traffic]");
query.push("[Measures].[Goods Quantity]");
var result = query.execute()
query.push("[Measures].[Max Quantity]");
var result = query.execute();

function test22(){
  query.pull('wrong measure');

  var expected = {"error":"OK","data":[{"[Measures].[Goods Quantity]":4.3838366E7},{"[Measures].[Max Quantity]":407391}]};
  var result = query.execute();
  deepEqual(expected, result, 'Tests if indeed you cannot take off a measure which was not pushed');
}

function test23(){
  query.pull('[Measures].[Max Quantity]');

  var expected = {"error":"OK","data":[{"[Measures].[Goods Quantity]":4.3838366E7}]};
  var result = query.execute();
  deepEqual(expected, result, 'Tests if indeed you can take off a measure which was pushed');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test22.toString(), test22);
  test(test23.toString(), test23);
}

runTests();


