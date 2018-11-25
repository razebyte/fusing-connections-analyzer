/** 
 * Task.js
 *
 * This will be a file that will contain the code that will execute a QoS Test.
 * In this case this will be an HTTP GET request on a test file publicly available.
 *
 * Various Metrics will be gathered.
 *
 * The aim of this task is to enable this to occur over a specific HTTP Proxy to compare different metrics.
 */
var http = require("http");
var fs = require("fs");
var fork = require("child_process").fork;


//TODO: Using Node, run ./libraries/node-bandwidth-tester/client.js against a given proxy
//TODO: Figure out how to do this

var child = fork('./node-bandwidth-tester/client');

