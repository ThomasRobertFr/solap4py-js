var query = new QueryAPI();


function test14(){
  equal(1, 1, '1 == 1');
}

function test15(){
  equal(1, 1, '1 == 1');
}

function test16(){
  equal(1, 1, '1 == 1');
}

function test17(){
  equal(1, 1, '1 == 1');
}

function test18(){
  equal(1, 1, '1 == 1');
}

function test19(){
  equal(1, 1, '1 == 1');
}

function test20(){
  equal(1, 1, '1 == 1');
}

function test21(){
  equal(1, 1, '1 == 1');
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


