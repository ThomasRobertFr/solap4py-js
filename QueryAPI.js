QueryAPI = function() {

    var from;
    var onRows;
    var onColumns;
    var where;

    this.getFrom = function() {
        return from;
    };

    this.getOnRows = function() {
        return onRows;
    };

    this.getOnColumns = function() {
        return onColumns;
    };

    this.getWhere = function() {
        return where;
    };

    this.drill = function(cube) {
        from = cube;
    };
    
    this.push = function(measure) {
        if (!(measure in onColumns)) {
            onColumns.push(measure);
        }
    };

    this.pull = function(measure) {
        index = onColumns.indexOf(measure);
        if (index != -1) {
            onColumns.splice(index, 1);
        }
    };

    this.slice = function(hierarchy, members, range) {
        if (!(hierarchy in onRows)) {
            onRows[hierarchy] = new Object();
        }
        onRows[hierarchy].members = members;
        onRows[hierarchy].range = range;
    };

    this.project = function(hierarchy) {
        if (hierarchy in onRows) {
            delete onRows[hierarchy];
        }
    };
/*
    this.switch = function(hierarchies) {
        var tmp = new Object();            
        for (var i = 0, hierarchy; hierarchy = hierarchies[i]; i++) {
           if(onRows.hasOwnProperty(hierarchy))
             tmp[hierarchy] = onRows[hierarchy];
        }
        onRows = tmp;
    };
*/
    this.filter = function(hierarchy, members, range) {
        if (!(hierarchy in where)) {
            where[hierarchy] = new Object();
        }
        where[hierarchy].members = members;
        where[hierarchy].range = range;
    };

    this.rank = function(hierarchy) {

    };

    this.execute = function() {
        var data = {
            "from" : from,
            "onColumns" : onColumns,
            "onRows" : onRows,
            "where" : where
        };
        return send("data", data);
    };

    this.clear = function() {
        from = null;
        onRows = new Object();
        onColumns = new Array();
        where = new Object();
    };

    this.explore = function(root, withProperties, granularity) {
        data = {"root": root, "withProperties" : withProperties, "granularity": granularity};
        return send("metadata", data);
    };

    var send = function(queryType, data) {
        var query = {
            "queryType" : queryType,
            "data" : data
        };
        var api_data;
        $.ajax({
            url: "/analytics/api/",
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(query),
            async: false,
            success: function(data) {
                api_data=data;
            }
        });
        return api_data;
    };

    this.clear();
};
