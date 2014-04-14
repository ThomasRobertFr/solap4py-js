var query = new QueryAPI();
query.clear();
query.drill("[Traffic]");
query.push("[Measures].[Goods Quantity]");
var result = query.execute()
query.push("[Measures].[Max Quantity]");
var result = query.execute();

function test22(){
  query.pull('wrong measure');
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test23(){
  query.pull('[Measures].[Max Quantity]');
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test22.toString(), test22);
  test(test23.toString(), test23);
}

runTests();


