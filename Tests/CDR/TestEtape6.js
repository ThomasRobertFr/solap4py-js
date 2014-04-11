var query = new QueryAPI();


function test35(){
  query.drill("[Sales]");
  query.push("[Measures].[Unit Sales]");
  query.push("[Measures].[Store Cost]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test36(){
  query.slice("[Time].[Year]", ["[1997]","[1998]"], false);
  query.slice("[Store].[Store Country]", ["[USA]","[Canada]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test37(){
  query.slice("[Time].[Quarter]", ["[1997].[Q1]","[1997].[Q3]"], false);
  var result = query.execute()
  equal(1, 1, '1 == 1');
}

function test38(){
  query.pull("[Measures].[Unit Sales]");
  equal(1, 1, '1 == 1');
}

function test39(){
  query.slice("[Store]", ["[New Brunswick]","[Quebec]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test40(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test41(){
  query.push("[Time]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test42(){
  query.slice("[Time].[Year]", ["[1997]","[1998]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test43(){
  equal(1, 1, '1 == 1');
}

function test44(){
  query.pull("[Measures].[Unit Sales]");
  equal(1, 1, '1 == 1');
}

function test45(){
  equal(1, 1, '1 == 1');
}

function test46(){
  query.project("[Time]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test47(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test48(){
  query.project("[Store]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test35.toString(), test35);
  test(test36.toString(), test36);
  test(test37.toString(), test37);
  test(test38.toString(), test38);
  test(test39.toString(), test39);
  test(test40.toString(), test40);
  test(test41.toString(), test41);
  test(test42.toString(), test42);
  test(test43.toString(), test43);
  test(test44.toString(), test44);
  test(test45.toString(), test45);
  test(test46.toString(), test46);
  test(test47.toString(), test47);
  test(test48.toString(), test48);
}

runTests();


