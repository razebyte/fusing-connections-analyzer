/** 
 * Task.js
 *
 * This will be a file that will contain the code that will execute a suite of Client QoS Tests.
 * 
 * These tests will be delegated to other task scripts, 
 * but this main one will provide the tests a specific HTTP Proxy to rn against.
 */
'use strict';

var http = require('http');
var taskEnvironment = require('./environment.json');
var BandwidthTask = require('./lib/BandwidthTask');
var PingTask = require('./lib/PingTask');

//TODO: Using these commands supply values to environment.json
// node ./node_modules/dispatch-proxy/bin/dispatch.js list
// node ./node_modules/dispatch-proxy/bin/dispatch.js start SOMEIP1 SOMEIP2
//
//This task is now ready for proxy support
// node ./task/node_modules/dispatch-proxy/bin/dispatch.js start --http --debug


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