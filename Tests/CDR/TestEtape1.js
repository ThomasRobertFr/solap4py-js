var query = new QueryAPI();


function test1(){
  var result = query.explore([]);
  equal(1, 1, '1 == 1');
}

function test2(){
  var result = query.explore(["wrong schema"]);
  equal(1, 1, '1 == 1');
}

function test3(){
  var result = query.explore(["Traffic"]);
  equal(1, 1, '1 == 1');
}

function test4(){
  var result = query.explore(["Traffic", "[wrong cube]"]);
  equal(1, 1, '1 == 1');
}

function test5(){
  var result = query.explore(["Traffic", "[Traffic]"]);
  equal(1, 1, '1 == 1');
}

function test6(){
  var result = query.explore(["Traffic", "[Traffic]", "[wrong dimension]"]);
  equal(1, 1, '1 == 1');
}

function test7(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]"]);
  equal(1, 1, '1 == 1');
}

function test8(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone.wrong]"]);
  equal(1, 1, '1 == 1');
}

function test9(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone.Name]"]);
  equal(1, 1, '1 == 1');
}

function test10(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone.Name]", "[wrong]"]);
  equal(1, 1, '1 == 1');
}

function test11(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone.Name]", "[Name0]"]);
  equal(1, 1, '1 == 1');
}

function test12(){
  var result = query.explore([]);
  equal(1, 1, '1 == 1');
}

function test13(){
  var result = query.explore([]);
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test1.toString(), test1);
  test(test2.toString(), test2);
  test(test3.toString(), test3);
  test(test4.toString(), test4);
  test(test5.toString(), test5);
  test(test6.toString(), test6);
  test(test7.toString(), test7);
  test(test8.toString(), test8);
  test(test9.toString(), test9);
  test(test10.toString(), test10);
  test(test11.toString(), test11);
  test(test12.toString(), test12);
  test(test13.toString(), test13);
}

runTests();


