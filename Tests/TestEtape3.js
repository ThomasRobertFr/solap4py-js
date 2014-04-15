module("Etape 3");

QUnit.config.reorder = false;

var query = new QueryAPI();

function test22(){
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.push("[Measures].[Max Quantity]");
  query.pull('wrong measure');

  var expected = {"error":"OK","data":[{"[Measures].[Goods Quantity]":4.3838366E7},{"[Measures].[Max Quantity]":407391}]};
  var result = query.execute();
  deepEqual(result, expected, 'Tests if indeed you cannot take off a measure which was not pushed');
}

function test23(){
  query.pull('[Measures].[Max Quantity]');

  var expected = {"error":"OK","data":[{"[Measures].[Goods Quantity]":4.3838366E7}]};
  var result = query.execute();
  deepEqual(result, expected, 'Tests if indeed you can take off a measure which was pushed');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test22.toString(), test22);
  test(test23.toString(), test23);
}

runTests();


