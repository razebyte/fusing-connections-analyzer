'use strict';

var taskEnvironment = require('./environment.json');
var TaskRunner = require('./lib/TaskRunner');

//TODO: Using these commands supply values to environment.json
// node ./node_modules/dispatch-proxy/bin/dispatch.js list
// node ./node_modules/dispatch-proxy/bin/dispatch.js start SOMEIP1 SOMEIP2
//
//This task is now ready for proxy support
// node ./task/node_modules/dispatch-proxy/bin/dispatch.js start --http --debug


// Step 1 start n proxies for all available configurations

//Example of how to start a proxy with dispatch

//node ./task/node_modules/dispatch-proxy/bin/dispatch.js start --http --debug


// Step 2 Call TaskRunner with the modified 
var runner = new TaskRunner( taskEnvironment );
runner.execute();