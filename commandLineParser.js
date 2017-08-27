const MongoClient = require("mongodb").MongoClient, 
      commandLineArgs = require("command-line-args"), 
      assert = require("assert"); 


const options = commandLineOptions(); //options is generated 
//before the call to the database 


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {
    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    var query = queryDocument(options);
    var projection = {"_id": 1, "name": 1, "founded_year": 1,
                      "number_of_employees": 1, "crunchbase_url": 1};
    var cursor = db.collection('companies').find(query, projection);
    var numMatches = 0;
    cursor.forEach( //takes in two arguments 
        function(doc) {
            numMatches = numMatches + 1;
            console.log( doc );
        },
        function(err) {
            assert.equal(err, null);
            console.log("Our query was:" + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return db.close();
        }
    );
});


//This function parses the command line inputs and returns
//an options object 
function commandLineOptions(){
	const optionDefinitions = [
		{name: "firstYear", alias: "f", type:Number}, 
		{name: "lastYear", alias:"l", type: Number}, 
		{name: "employees", alias:"p", type: Number}
	];
	const options = commandLineArgs(optionDefinitions); 
	if (!((options.firstYear) && (options.lastYear))){
		console.log("Please enter both first year and last year values"); 
		process.exit(); 
	}
	return options; 
}


// this function takes in the options object and 
//constructs the query object. This is called from inside the 
//MongoClient.connect call back
function queryDocument(options) {
    console.log(options);   
    var query = {
        "founded_year": {
            "$gte": options.firstYear,
            "$lte": options.lastYear
        }
    };
    if ("employees" in options) {
        query.number_of_employees = { "$gte": options.employees };
    }       
    return query;   
}
