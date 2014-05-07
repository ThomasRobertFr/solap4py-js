/**
 * Description
 * 
 * @class
 */

QueryAPI = function() {
    
    /**
     * Cube
     * @private
     * @type String
     */
    var from;
    var onRows;
    var onColumns;
    var where;



	/** Returns the from attribute of the QueryAPI.
	 * 
	 * */
    this.getFrom = function() {
        return from;
    };
    
       
	/** Returns the onRows attribute of the QueryAPI.
	 * 
	 * */
    this.getOnRows = function() {
        return onRows;
    };


	/** Returns the onColumns attribute of the QueryAPI.
	 * 
	 * */
    this.getOnColumns = function() {
        return onColumns;
    };


	/** Returns the where attribute of the QueryAPI.
	 * 
	 * */
    this.getWhere = function() {
        return where;
    };
    
    
	/** Defines the from attribute of the QueryAPI.
	 * 
	 * */
    this.drill = function(cube) {
	/** The cube of the QueryAPI */
        from = cube;
    };
    
    
    /** Adds a measure dimension on 
     * the columns, if it's not already there.
     * */
    this.push = function(measure) {
		/** The measure to add on onColumns*/
        if (!(measure in onColumns)) {
            onColumns.push(measure);
        }
    };

	/** Withdraws a measure dimension of 
     * the columns, if it is on the columns.
     * */
    this.pull = function(measure) {
		/** The measure to withdraw on onColumns*/
		
        index = onColumns.indexOf(measure);
        if (index != -1) {
            onColumns.splice(index, 1);
        }
    };

	/** Adds members of a dimension on 
     * the rows.If the dimension of the members is not already in the rows, 
     * it is added as well.
     * */
    this.slice = function(hierarchy, members, range) {
		/**
		 * hierarchy : hierarchy of the members to add
		 * members : members to add.
		 * range : boolean indicating if the members beetween 
		 * the members are added or not. 
		 * 
		 * */
		
        if (!(hierarchy in onRows)) {
            onRows[hierarchy] = new Object();
        }
        if (range === undefined) {
          range = false;
        }
        onRows[hierarchy].members = members;
        onRows[hierarchy].range = range;
    };

	/** Withdraws a hierarchy selected of a dimension of 
     * the rows, if it is in the rows.
     * */
    this.project = function(hierarchy) {
		/**
		 * The hierarchy to withdraw.
		 * */
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

/** Adds members of a dimension in 
     * the where of the request QueryAPI.
     * If the dimension of the members is not already in the where,
     * it is added as well.
     *
     * */
    this.filter = function(hierarchy, members, range) {
		/**
		 * hierarchy : hierarchy of the members added
		 * members : the members to add.
		 * range : boolean indicating if the members beetween 
		 * the members are added or not.
		 * */
		
        if (!(hierarchy in where)) {
            where[hierarchy] = new Object();
        }
        where[hierarchy].members = members;
        where[hierarchy].range = range;
    };

    this.rank = function(hierarchy) {

    };

/** Sends the QueryAPI to be executed and returns 
     * a data result. 
     * */
    this.execute = function() {
        var data = {
            "from" : from,
            "onColumns" : onColumns,
            "onRows" : onRows,
            "where" : where
        };
        return send("data", data);
    };

	/** Clears the QueryAPI. It becomes empty.
     * */
    this.clear = function() {
        from = null;
        onRows = new Object();
        onColumns = new Array();
        where = new Object();
    };


	/** Sends the QueryAPI to be executed and returns 
     * a metadata result. 
     * */
    this.explore = function(root, withProperties, granularity) {
		/** root : is an array that contains the elements of which we 
		 * want to recover the metadata, it can contain 6 elements max.
		 *  withProperties : is a boolean to know if
		 *  it recovers the properties of the elements of the root.
		 * 	granularity : is only necessary if there are 6 elements in the
		 * root. It enables to choose the granularity of the members in 
		 * the root 
		 *  */
        var data = { "root": root, "withProperties": withProperties, "granularity": granularity };
        return send("metadata", data);
    };


	/** Format the queryType and data to be in the JSON result.Then 
	* sends the JSON results to the user.
	* 
	* */
 
    var send = function(queryType, data) {
		
		/**
		 * queryType : Type of data (data or metadata).
		 * data : data in a JSON fomat
		 * */
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
