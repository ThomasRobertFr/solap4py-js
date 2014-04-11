var query = new QueryAPI();


function test22(){
  equal(1, 1, '1 == 1');
}

function test23(){
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


