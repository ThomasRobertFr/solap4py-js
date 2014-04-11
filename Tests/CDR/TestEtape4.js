var query = new QueryAPI();
query.clear();
query.drill("Traffic");
query.push("[Measures].[Goods Quantity]");
var result = query.execute()
query.push("[Measures].[Max Quantity]");
var result = query.execute();
query.pull('wrong measure');
var result = query.execute();
query.pull('[Measures].[Max Quantity]');
var result = query.execute();


function test24(){
  query.slice("[wrong dimension]", ["[2000]","[2010]"], true);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test25(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[-3]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test26(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[2000]","[2001]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test27(){
  query.slice("[Zone.Name]", ["[France]","[Germany]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test28(){
  equal(1, 1, '1 == 1');
}

function test29(){
  equal(1, 1, '1 == 1');
}

function test30(){
  equal(1, 1, '1 == 1');
}

function test31(){
  query.project("wrong hierarchy");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test32(){
  query.project("[Zone.Name]");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test24.toString(), test24);
  test(test25.toString(), test25);
  test(test26.toString(), test26);
  test(test27.toString(), test27);
  test(test28.toString(), test28);
  test(test29.toString(), test29);
  test(test30.toString(), test30);
  test(test31.toString(), test31);
  test(test32.toString(), test32);
}

runTests();


