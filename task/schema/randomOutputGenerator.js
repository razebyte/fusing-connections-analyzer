var fs = require('fs');

if(process.argv.length !== 4) {
	console.error(
		"ERROR: Input 2 additional arguments.\n" + 
		"\t(1 | int) number of Networks being tested\n" +
		"\t(2 | int) number of number of times the test has been"
	);
}

var numberOfNetworks = process.argv[2];
var numberOfTimes = process.argv[3];





var result = {};

for(var i=0; i < numberOfNetworks; i++) {
	var dateAndTests = {};
	var modifiedDate = new Date();
	for(var j=0; j < numberOfTimes; j++) {
		modifiedDate.setHours(modifiedDate.getHours()+1);
		dateAndTests[modifiedDate.toISOString()] = [
			{
				"test": "BandwidthTask",
				"result": {
					latency: (Math.random() * 1000),
					dataSizeKB: (Math.random() * 1000),
					avgThroughput: (Math.random() * 1000),
					maxThroughput: (Math.random() * 1000),
					minThroughput: (Math.random() * 1000)
				}
			}
		]
	}

	result["Wifi" + i] = dateAndTests;
}


var schema = {
	"NetworkIdentifier": {
		"someDateInYYYY-MM-DD-HH-MMFormat": [
			{
				"test": "TheNameOfATest",
				"result": {}
			}
		]
	}
};

var stringResult = JSON.stringify(result, null, "\t");

fs.writeFile(
	"output.generator.json.tmp", 
	stringResult, 
	function(err) {
		if(err) return console.log(err);
		console.log("The generated file has been saved as: output.generator.json.tmp");
	}
); 