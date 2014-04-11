var query = new QueryAPI();


function test33(){
  equal(1, 1, '1 == 1');
}

function test34(){
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test33.toString(), test33);
  test(test34.toString(), test34);
}

runTests();


