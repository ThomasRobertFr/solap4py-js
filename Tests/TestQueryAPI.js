function testDrill(){
  var query = new QueryAPI();
  query.drill('Sales');
  equal(query.getFrom(), 'Sales', 'Query from is Sales');
  query.drill('Traffic');
  equal(query.getFrom(), 'Traffic', 'Query from is Traffic');
}

function testPush(){
  var query = new QueryAPI();
  query.push('Goods Quantity');
  equal(query.getOnColumns().length, 1, 'Query onColumns contains 1 element');
  equal(query.getOnColumns()[query.getOnColumns().length - 1], 'Goods Quantity', 'Query onColumns only contains \'Goods Quantity\'');
  query.push('Max Quantity');
  equal(query.getOnColumns().length, 2, 'Query onColumns contains 2 element');
  equal(query.getOnColumns()[query.getOnColumns().length - 2], 'Goods Quantity', 'Query onColumns still contains \'Goods Quantity\'');
  equal(query.getOnColumns()[query.getOnColumns().length - 1], 'Max Quantity', 'Query onColumns now contains \'Max Quantity\'');
}

function testPull(measure){
  var query = new QueryAPI();
  query.push('Goods Quantity');
  query.push('Max Quantity');
  query.pull('Max Quantity');
  equal(query.getOnColumns().length, 1, 'Query onColumns contains 1 element');
  equal(query.getOnColumns()[query.getOnColumns().length - 1], 'Goods Quantity', 'Query onColumns only contains \'Goods Quantity\'');
  query.pull('wrong parameter');
  equal(query.getOnColumns().length, 1, 'Query onColumns still contains 1 element');
  equal(query.getOnColumns()[query.getOnColumns().length - 1], 'Goods Quantity', 'Query onColumns still only contains \'Goods Quantity\'');
  query.pull('Goods Quantity');
  equal(query.getOnColumns().length, 0, 'Query onColumns is now empty');
  query.pull('Goods Quantity');
  equal(query.getOnColumns().length, 0, 'Query onColumns is still empty');
}

function testSlice(){
  var query = new QueryAPI();
  query.slice("[Time]", ["[2000]","[2010]"], true);
  var props = Object.keys(query.getOnRows());
  equal(props.length, 1, 'Query onRows contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query onRows only contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2000]","[2010]"], 'Query onRows \'[Time]\' property contains the members ["[2000]","[2010]"]');
  equal(query.getOnRows()['[Time]'].range, true, 'Query onRows \'[Time]\' property has range = true');

  query.slice("[Time]", ["[2015]","[2020]"], false);

  props = Object.keys(query.getOnRows());
  equal(props.length, 1, 'Query onRows still contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query onRows still only contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2015]","[2020]"], 'Query onRows \'[Time]\' property now contains the members ["[2015]","[2020]"]');
  equal(query.getOnRows()['[Time]'].range, false, 'Query onRows \'[Time]\' property now has range = false');


  query.slice("[Zone.Name]", ["[France]","[Denmark]"], false);
  props = Object.keys(query.getOnRows());
  equal(props.length, 2, 'Query onRows contains 2 properties');
  equal(props[props.length - 2], '[Time]', 'Query onRows still contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2015]","[2020]"], 'Query onRows \'[Time]\' property still contains the members ["[2015]","[2020]"]');
  equal(query.getOnRows()['[Time]'].range, false, 'Query onRows \'[Time]\' property still has range = false');

  equal(props[props.length - 1], '[Zone.Name]', 'Query onRows now contains the \'[Zone.Name]\' property');
  deepEqual(query.getOnRows()['[Zone.Name]'].members, ["[France]","[Denmark]"], 'Query onRows \'[Zone.Name]\' property contains the members ["[France]","[Denmark]"]');
  equal(query.getOnRows()['[Zone.Name]'].range, false, 'Query onRows \'[Zone.Name]\' property has range = false');
}

function testProject(){
  var query = new QueryAPI();
  query.slice("[Time]", ["[2000]","[2010]"], true);
  query.slice("[Zone.Name]", ["[France]","[Denmark]"], false);
  query.project("[Zone.Name]");
  var props = Object.keys(query.getOnRows());
  equal(props.length, 1, 'Query onRows contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query onRows contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2000]","[2010]"], 'Query onRows \'[Time]\' property contains the members ["[2000]","[2010]"]');
  equal(query.getOnRows()['[Time]'].range, true, 'Query onRows \'[Time]\' property has range = true');

  query.project("wrong parameter");
  props = Object.keys(query.getOnRows());
  equal(props.length, 1, 'Query onRows still contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query onRows still contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2000]","[2010]"], 'Query onRows \'[Time]\' property still contains the members ["[2000]","[2010]"]');
  equal(query.getOnRows()['[Time]'].range, true, 'Query onRows \'[Time]\' property still has range = true');

  query.project("[Time]");
  props = Object.keys(query.getOnRows());
  equal(props.length, 0, 'Query onRows is now empty');

  query.project("[Time]");
  props = Object.keys(query.getOnRows());
  equal(props.length, 0, 'Query onRows is still empty');
}

function testSwitch(){
  var query = new QueryAPI();
  query.slice("[Time]", ["[2000]","[2010]"], true);
  query.slice("[Zone.Name]", ["[France]","[Denmark]"], false);
  query.switch(["[Zone.Name]","[Time]"]);
  var props = Object.keys(query.getOnRows());
  equal(props.length, 2, 'Query onRows contains 2 properties');
  equal(props[props.length - 1], '[Time]', 'Query onRows contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2000]","[2010]"], 'Query onRows \'[Time]\' property contains the members ["[2000]","[2010]"]');
  equal(query.getOnRows()['[Time]'].range, true, 'Query onRows \'[Time]\' property has range = true');
  equal(props[props.length - 2], '[Zone.Name]', 'Query onRows now contains the \'[Zone.Name]\' property');
  deepEqual(query.getOnRows()['[Zone.Name]'].members, ["[France]","[Denmark]"], 'Query onRows \'[Zone.Name]\' property contains the members ["[France]","[Denmark]"]');
  equal(query.getOnRows()['[Zone.Name]'].range, false, 'Query onRows \'[Zone.Name]\' property has range = false');

  query.switch(["[another hierarchy]","[Time]"]);
  props = Object.keys(query.getOnRows());
  equal(props.length, 1, 'Query onRows now contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query onRows contains the \'[Time]\' property');
  deepEqual(query.getOnRows()['[Time]'].members, ["[2000]","[2010]"], 'Query onRows \'[Time]\' property contains the members ["[2000]","[2010]"]');
  equal(query.getOnRows()['[Time]'].range, true, 'Query onRows \'[Time]\' property has range = true');

  query.switch([]);
  props = Object.keys(query.getOnRows());
  equal(props.length, 0, 'Query onRows is now empty');

  query.switch(["[Time]","[Zone.Name]"]);
  props = Object.keys(query.getOnRows());
  equal(props.length, 0, 'Query onRows is still empty');
}

function testFilter(){
  var query = new QueryAPI();
  query.filter("[Time]", ["[2000]","[2010]"], true);
  var props = Object.keys(query.getWhere());
  equal(props.length, 1, 'Query where contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query where only contains the \'[Time]\' property');
  deepEqual(query.getWhere()['[Time]'].members, ["[2000]","[2010]"], 'Query where \'[Time]\' property contains the members ["[2000]","[2010]"]');
  equal(query.getWhere()['[Time]'].range, true, 'Query where \'[Time]\' property has range = true');

  query.filter("[Time]", ["[2015]","[2020]"], false);

  props = Object.keys(query.getWhere());
  equal(props.length, 1, 'Query where still contains 1 property');
  equal(props[props.length - 1], '[Time]', 'Query where still only contains the \'[Time]\' property');
  deepEqual(query.getWhere()['[Time]'].members, ["[2015]","[2020]"], 'Query where \'[Time]\' property now contains the members ["[2015]","[2020]"]');
  equal(query.getWhere()['[Time]'].range, false, 'Query where \'[Time]\' property now has range = false');


  query.filter("[Zone.Name]", ["[France]","[Denmark]"], false);
  props = Object.keys(query.getWhere());
  equal(props.length, 2, 'Query where contains 2 properties');
  equal(props[props.length - 2], '[Time]', 'Query where still contains the \'[Time]\' property');
  deepEqual(query.getWhere()['[Time]'].members, ["[2015]","[2020]"], 'Query where \'[Time]\' property still contains the members ["[2015]","[2020]"]');
  equal(query.getWhere()['[Time]'].range, false, 'Query where \'[Time]\' property still has range = false');

  equal(props[props.length - 1], '[Zone.Name]', 'Query where now contains the \'[Zone.Name]\' property');
  deepEqual(query.getWhere()['[Zone.Name]'].members, ["[France]","[Denmark]"], 'Query where \'[Zone.Name]\' property contains the members ["[France]","[Denmark]"]');
  equal(query.getWhere()['[Zone.Name]'].range, false, 'Query where \'[Zone.Name]\' property has range = false');
}

function testRank(){
  var query = new QueryAPI();
  ok( 0 == 1, "Rank function not yet implemented");
}

function testExecute(){
  var myQuery = new QueryAPI();
  myQuery.drill("Traffic");
  myQuery.push("[Measures].[Max Quantity]")
  myQuery.slice("[Time]", ["[2000]", "[2003]"], true);
  output = myQuery.execute();
  expectedResult = {"error":"OK","data":[{"[Measures].[Max Quantity]":[311121],"[Time]":["[Time].[All Times].[2000]"]},{"[Measures].[Max Quantity]":[304574],"[Time]":["[Time].[All Times].[2001]"]},{"[Measures].[Max Quantity]":[310543],"[Time]":["[Time].[All Times].[2002]"]},{"[Measures].[Max Quantity]":[315811],"[Time]":["[Time].[All Times].[2003]"]}]};
  equal( output, expectedResult, "Query with range=true" );
  

  myQuery.clear();
  
  myQuery.drill("Traffic");
  myQuery.push("[Measures].[Max Quantity]")
  myQuery.slice("[Time]", ["[2000]", "[2003]"], false);
  output = myQuery.execute();
  expectedResult = {"error":"OK","data":[{"[Measures].[Max Quantity]":[311121],"[Time]":["[Time].[All Times].[2000]"]},{"[Measures].[Max Quantity]":[315811],"[Time]":["[Time].[All Times].[2003]"]}]};
  equal( output, expectedResult, "Query with range=false" );

  myQuery.clear();

  myQuery.drill("Traffic");
  myQuery.push("[Measures].[Max Quantity]")
  output = myQuery.execute();
  expectedResult = {"error":"OK","data":[{"[Measures].[Max Quantity]":407391}]};
  equal( output, expectedResult, "Query without onRows key to define members" );

  myQuery.clear();

  myQuery.drill("Traffic");
  myQuery.slice("[Time]", ["[2000]", "[2003]"], false);
  output = myQuery.execute();
  expectedResult = {"error":"OK","data":[{"[Measures].[Max Quantity]":[311121],"[Time]":["[Time].[All Times].[2000]"]},{"[Measures].[Max Quantity]":[315811],"[Time]":["[Time].[All Times].[2003]"]}]};
  equal( output, expectedResult, "Query without onColumns key to define a measure" );

  myQuery.clear();

  myQuery.drill("DoesNotExist");
  output = myQuery.execute();
  expectedResult = {"error":"SERVER_ERROR","data":"XMLA provider gave exception: <SOAP-ENV:Fault>\n\t\n\t<faultcode>\n\t\tSOAP-ENV:Client.00HSBD01\n\t<\/faultcode>\n\t\n\t<faultstring>\n\t\tXMLA MDX parse failed\n\t<\/faultstring>\n\t\n\t<faultactor>\n\t\tMondrian\n\t<\/faultactor>\n\t\n\t<detail>\n\t\t\n\t\t<XA:error xmlns:XA=\"http://mondrian.sourceforge.net\">\n\t\t\t\n\t\t\t<code>\n\t\t\t\t00HSBD01\n\t\t\t<\/code>\n\t\t\t\n\t\t\t<desc>\n\t\t\t\tThe Mondrian XML: Mondrian Error:MDX cube 'DoesNotExist' not found\n\t\t\t<\/desc>\n\t\t\t\n\t\t<\/XA:error>\n\t\t\n\t<\/detail>\n\t\n<\/SOAP-ENV:Fault>\n"};
  equal( output, expectedResult, "Query on a cube that does not exist: returns an error" );

  myQuery.clear();

  myQuery.drill("Traffic");
  myQuery.push("[Measures].[DoesNotExist]")
  output = myQuery.execute();
  expectedResult = {"error":"SERVER_ERROR","data":"XMLA provider gave exception: <SOAP-ENV:Fault>\n\t\n\t<faultcode>\n\t\tSOAP-ENV:Client.00HSBD01\n\t<\/faultcode>\n\t\n\t<faultstring>\n\t\tXMLA MDX parse failed\n\t<\/faultstring>\n\t\n\t<faultactor>\n\t\tMondrian\n\t<\/faultactor>\n\t\n\t<detail>\n\t\t\n\t\t<XA:error xmlns:XA=\"http://mondrian.sourceforge.net\">\n\t\t\t\n\t\t\t<code>\n\t\t\t\t00HSBD01\n\t\t\t<\/code>\n\t\t\t\n\t\t\t<desc>\n\t\t\t\tThe Mondrian XML: Mondrian Error:MDX object '[Measures].[DoesNotExist]' not found in cube 'Traffic'\n\t\t\t<\/desc>\n\t\t\t\n\t\t<\/XA:error>\n\t\t\n\t<\/detail>\n\t\n<\/SOAP-ENV:Fault>\n"};
  equal( output, expectedResult, "Query on a measure that does not exist: returns an error" );


  myQuery.clear();

  myQuery.drill("Traffic");

  output = myQuery.execute();
  myQuery.slice("[Time]", ["[2000]", "[DoesNotExist]"], true);
  expectedResult = {"error":"SERVER_ERROR","data":"XMLA provider gave exception: <SOAP-ENV:Fault>\n\t\n\t<faultcode>\n\t\tSOAP-ENV:Client.00HSBD01\n\t<\/faultcode>\n\t\n\t<faultstring>\n\t\tXMLA MDX parse failed\n\t<\/faultstring>\n\t\n\t<faultactor>\n\t\tMondrian\n\t<\/faultactor>\n\t\n\t<detail>\n\t\t\n\t\t<XA:error xmlns:XA=\"http://mondrian.sourceforge.net\">\n\t\t\t\n\t\t\t<code>\n\t\t\t\t00HSBD01\n\t\t\t<\/code>\n\t\t\t\n\t\t\t<desc>\n\t\t\t\tThe Mondrian XML: Mondrian Error:MDX object '[Time].[DoesNotExist]' not found in cube 'Traffic'\n\t\t\t<\/desc>\n\t\t\t\n\t\t<\/XA:error>\n\t\t\n\t<\/detail>\n\t\n<\/SOAP-ENV:Fault>\n"};
  equal( output, expectedResult, "Query on a member that does not exist: returns an error" );

  
}

function testClear(){
  var myQuery = new QueryAPI();
  myQuery.drill("Traffic");
  myQuery.push("[Measures].[Max Quantity]")
  myQuery.slice("[Time]", ["[2000]", "[2010]"], true);

  myQuery.clear();

  ok( myQuery.getFrom() == null, "Tests if from is null" );
  ok( !Object.keys(myQuery.getOnRows()).length, "Tests if onRows is empty" );
  ok( !Object.keys(myQuery.getOnColumns()).length, "Tests if onColumns is empty" );
  ok( !Object.keys(myQuery.getWhere()).length, "Tests if where is empty" );
}

function testExplore(){
  var myQuery = new QueryAPI();
  input = {"root" : ["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]"], "property" : true };

  expectedOutput = {"error":"OK","data":[{"id":"(All)","caption":"(All)"},{"id":"Name0","caption":"Name0"},{"id":"Name1","caption":"Name1"},{"id":"Name2","caption":"Name2"},{"id":"Name3","caption":"Name3"}]};
;

  output = myQuery.explore(input);
  equal( output, expectedOutput, "Tests if an input JSON produces an expected result." );
}

function testSend(){
  var query = new QueryAPI();
  ok(1 == "1", "Passed!");
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(testDrill.toString(), testDrill);
  test(testPush.toString(), testPush);
  test(testPull.toString(), testPull);
  test(testSlice.toString(), testSlice);
  test(testProject.toString(), testProject);
  test(testSwitch.toString(), testSwitch);
  test(testFilter.toString(), testFilter);
  test(testRank.toString(), testRank);
  test(testExecute.toString(), testExecute);
  test(testClear.toString(), testClear);
  test(testExplore.toString(), testExplore);
  test(testSend.toString(), testSend);
}

runTests();


