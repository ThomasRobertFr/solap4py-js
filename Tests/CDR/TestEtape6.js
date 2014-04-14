var query = new QueryAPI();


function test32(){
  query.drill("[Sales]");
  query.push("[Measures].[Unit Sales]");
  query.push("[Measures].[Store Cost]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test33(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997]","[Time].[Year].[1998]"], false);
  query.slice("[Store].[Store Country]", ["[Store].[Store Country].[USA]","[Store].[Store Country].[Canada]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test34(){
  query.slice("[Time].[Quarter]", ["[Time].[Quarter].[1997].[Q1]","[Time].[Quarter].[1997].[Q3]"], false);
  var result = query.execute()
  equal(1, 1, '1 == 1');
}

function test35(){
  query.pull("[Measures].[Unit Sales]");
  equal(1, 1, '1 == 1');
}

function test36(){
  query.slice("[Store]", ["[Store].[New Brunswick]","[Store].[Quebec]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test37(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test38(){
  query.project("[Time]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test39(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997]","[Time].[Year].[1998]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test40(){
  query.pull("[Measures].[Unit Sales]");
  equal(1, 1, '1 == 1');
}


function test41(){
  query.project("[Time]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test42(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test43(){
  query.project("[Store]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test32.toString(), test35);
  test(test33.toString(), test36);
  test(test34.toString(), test37);
  test(test35.toString(), test35);
  test(test36.toString(), test36);
  test(test37.toString(), test37);
  test(test38.toString(), test38);
  test(test39.toString(), test39);
  test(test40.toString(), test40);
  test(test41.toString(), test41);
  test(test42.toString(), test42);
  test(test43.toString(), test43);
}

runTests();


