module("Etape 6");

QUnit.config.reorder = false;

var query = new QueryAPI();

function test32(){
  query.drill("[Sales]");
  query.push("[Measures].[Unit Sales]");
  query.push("[Measures].[Store Cost]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 225627.2336,
    "[Measures].[Unit Sales]": 266773
  }
]);
}

function test33(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997]","[Time].[Year].[1998]"], false);
  query.slice("[Store].[Store Country]", ["[Store].[Store Country].[USA]","[Store].[Store Country].[Canada]"], false);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 225627.2336,
    "[Measures].[Unit Sales]": 266773,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Store Cost]": 220645.1136,
    "[Measures].[Unit Sales]": 259916,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1998]"
  },
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Store Cost]": 39332.5705,
    "[Measures].[Unit Sales]": 46157,
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1998]"
  }
]);
}

function test34(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997].[Q1]","[Time].[Year].[1997].[Q3]"], false);
  var result = query.execute()
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 55752.2405,
    "[Measures].[Unit Sales]": 66291,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Store Cost]": 55904.8694,
    "[Measures].[Unit Sales]": 65848,
    "[Store]": "[Store].[All Stores].[USA]",
    "[Time]": "[Time].[1997].[Q3]"
  },
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada]",
    "[Time]": "[Time].[1997].[Q3]"
  }
]);
}

function test35(){
  query.pull("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Store Cost]": 55752.2405,"[Store]": "[Store].[All Stores].[USA]","[Time]": "[Time].[1997].[Q1]"},{"[Measures].[Store Cost]": 55904.8694,"[Store]": "[Store].[All Stores].[USA]","[Time]": "[Time].[1997].[Q3]"},{"[Measures].[Store Cost]": 0,"[Store]": "[Store].[All Stores].[Canada]","[Time]": "[Time].[1997].[Q1]"},{"[Measures].[Store Cost]": 0,"[Store]": "[Store].[All Stores].[Canada]","[Time]": "[Time].[1997].[Q3]"}]);
}

function test36(){
  query.project("[Store].[Store Country]"); // must do
  query.slice("[Store].[Store State]", ["[Store].[Store State].[BC]","[Store].[Store State].[CA]"], false);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Store Cost]": 0,"[Store]": "[Store].[All Stores].[Canada].[BC]","[Time]": "[Time].[1997].[Q1]"},{"[Measures].[Store Cost]": 0,"[Store]": "[Store].[All Stores].[Canada].[BC]","[Time]": "[Time].[1997].[Q3]"},{"[Measures].[Store Cost]": 14431.0851,"[Store]": "[Store].[All Stores].[USA].[CA]","[Time]": "[Time].[1997].[Q1]"},{"[Measures].[Store Cost]": 15672.8256,"[Store]": "[Store].[All Stores].[USA].[CA]","[Time]": "[Time].[1997].[Q3]"}]);
}

function test37(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada].[BC]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada].[BC]",
    "[Time]": "[Time].[1997].[Q3]"
  },
  {
    "[Measures].[Store Cost]": 14431.0851,
    "[Measures].[Unit Sales]": 16890,
    "[Store]": "[Store].[All Stores].[USA].[CA]",
    "[Time]": "[Time].[1997].[Q1]"
  },
  {
    "[Measures].[Store Cost]": 15672.8256,
    "[Measures].[Unit Sales]": 18370,
    "[Store]": "[Store].[All Stores].[USA].[CA]",
    "[Time]": "[Time].[1997].[Q3]"
  }
]);
}

function test38(){
  query.project("[Time].[Year]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"],[
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada].[BC]"
  },
  {
    "[Measures].[Store Cost]": 63530.4251,
    "[Measures].[Unit Sales]": 74748,
    "[Store]": "[Store].[All Stores].[USA].[CA]"
  }
]);
}

function test39(){
  query.slice("[Time].[Year]", ["[Time].[Year].[1997]","[Time].[Year].[1998]"], false);
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], 	

[
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada].[BC]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Store Cost]": 39332.5705,
    "[Measures].[Unit Sales]": 46157,
    "[Store]": "[Store].[All Stores].[Canada].[BC]",
    "[Time]": "[Time].[1998]"
  },
  {
    "[Measures].[Store Cost]": 63530.4251,
    "[Measures].[Unit Sales]": 74748,
    "[Store]": "[Store].[All Stores].[USA].[CA]",
    "[Time]": "[Time].[1997]"
  },
  {
    "[Measures].[Store Cost]": 61936.3326,
    "[Measures].[Unit Sales]": 73017,
    "[Store]": "[Store].[All Stores].[USA].[CA]",
    "[Time]": "[Time].[1998]"
  }
]);
}

function test40(){
  query.pull("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Store Cost]": 0,"[Store]": "[Store].[All Stores].[Canada].[BC]","[Time]": "[Time].[1997]"},{"[Measures].[Store Cost]": 39332.5705,"[Store]": "[Store].[All Stores].[Canada].[BC]","[Time]": "[Time].[1998]"},{"[Measures].[Store Cost]": 63530.4251,"[Store]": "[Store].[All Stores].[USA].[CA]","[Time]": "[Time].[1997]"},{"[Measures].[Store Cost]": 61936.3326,"[Store]": "[Store].[All Stores].[USA].[CA]","[Time]": "[Time].[1998]"}]);
}


function test41(){
  console.log(query.getOnRows());
  query.project("[Time].[Year]");
  console.log(query.getOnRows());
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"[Measures].[Store Cost]": 0,"[Store]": "[Store].[All Stores].[Canada].[BC]"},{"[Measures].[Store Cost]": 63530.4251,"[Store]": "[Store].[All Stores].[USA].[CA]"}]);
}

function test42(){
  query.push("[Measures].[Unit Sales]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 0,
    "[Measures].[Unit Sales]": 0,
    "[Store]": "[Store].[All Stores].[Canada].[BC]"
  },
  {
    "[Measures].[Store Cost]": 63530.4251,
    "[Measures].[Unit Sales]": 74748,
    "[Store]": "[Store].[All Stores].[USA].[CA]"
  }
]);
}

function test43(){
  query.project("[Store].[Store State]");
  var result = query.execute();
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [
  {
    "[Measures].[Store Cost]": 225627.2336,
    "[Measures].[Unit Sales]": 266773
  }
]);
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test32.toString(), test32);
  test(test33.toString(), test33);
  test(test34.toString(), test34);
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


