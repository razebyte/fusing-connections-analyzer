// Author: Siavash Khan || RazeByte
"use strict";

const fs = require('fs'); // file-system
const TaskRunner = require('./lib/TaskRunner');
const DispatchCaller = require('./lib/DispatchCaller.js');


var writeToJsonDb = function( newResults ) {
	var pathToDb = "./results.database.json";

	var jsonDb = fs.existsSync(pathToDb) ? JSON.parse(
		fs.readFileSync(pathToDb)
	) : {};


	//Add the newResults to the jsonDb
	
	Object.keys(newResults).forEach(
		networkId => {
			if(typeof jsonDb[networkId] === 'undefined') jsonDb[networkId] = {};

			Object.keys(newResults[networkId]).forEach(
				dateExecuted => jsonDb[networkId][dateExecuted] = newResults[networkId][dateExecuted]
			);
		}
	);

	// Write the modified jsonDb
	fs.writeFile(
		pathToDb, 
		JSON.stringify(jsonDb, null, "\t"), 
		function(err) {
			if(err) return console.log(err);
			console.log("the database has been updated");
		}
	); 
}

var identifyProxy = function( proxy ) {
	var ids = proxy.addresses.map(a => a.address);
	ids.sort();
	return "Connection-"+ids.join("-");
}


let dispatchCaller = new DispatchCaller();

var taskRunners = [];
var addrCombos = dispatchCaller.getNetworkAddressCombinations();
for (var x = 0; x < addrCombos.length; x++) {
	var port = dispatchCaller.getFreePort();
	var proxy = dispatchCaller.startHTTPProxy(
		addrCombos[x], 
		port
	);

	var proxyIdentifier = identifyProxy( proxy );

	let taskEnvironment = JSON.parse(
		fs.readFileSync("environment.json")
	);
	taskEnvironment.proxy.port = port;

	taskRunners.push(
		new TaskRunner(
			taskEnvironment,
			proxy,
			proxyIdentifier
		)
	);
}

Promise.all( 
	taskRunners.map(
		taskRunner => taskRunner.execute()
	) 
).then( (resolved, rejected) => writeToJsonDb(
	resolved.reduce(
		(acc,cv) => {
			acc[cv.id] = cv.data
			return acc;
		},
		{}
	)
));
