var query = new QueryAPI();
query.clear();
query.drill("[Traffic]");
query.push("[Measures].[Goods Quantity]");
var result = query.execute()
query.push("[Measures].[Max Quantity]");
var result = query.execute();
query.pull('wrong measure');
var result = query.execute();
query.pull('[Measures].[Max Quantity]');
var result = query.execute();


function test24(){
  query.slice("[wrong dimension]", ["[wrong dimension].[2000]","[wrong dimension].[2010]"], true);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test25(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[Time].[-3]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test26(){
  query.clear();
  query.drill("[Traffic]");
  query.push("[Measures].[Goods Quantity]");
  query.slice("[Time]", ["[Time].[2000]","[Time].[2001]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test27(){
  query.slice("[Zone.Name]", ["[Zone.Name].[France]","[Zone.Name].[Germany]"], false);
  var result = query.execute();
  equal(1, 1, '1 == 1');
}


function test28(){
  query.project("wrong hierarchy");
  var result = query.execute();
  equal(1, 1, '1 == 1');
}

function test29(){
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


