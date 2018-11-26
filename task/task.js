/** 
 * Task.js
 *
 * This will be a file that will contain the code that will execute a suite of Client QoS Tests.
 * 
 * These tests will be delegated to other task scripts, 
 * but this main one will provide the tests a specific HTTP Proxy to rn against.
 */
'use strict';

var http = require("http");
var taskEnvironment = require('./environment.json');
var BandwidthTask = require('./lib/BandwidthTask');
var PingTask = require('./lib/PingTask');


var writeResults = function( results ) {
	//TODO: Write the results to a JSON file or just console it
	console.log("============ Writing Results ============");
	console.log(results);
}


var tasks = [
	new BandwidthTask( taskEnvironment ),
	new PingTask( taskEnvironment )
];

Promise.all( 
	tasks.map(
		task => task.execute()
	) 
).then( 
	value => writeResults(value) 
);