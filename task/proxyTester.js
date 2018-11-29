// Author: Siavash Khan || RazeByte
"use strict";

var taskEnvironment = require('./environment.json');
var TaskRunner = require('./lib/TaskRunner');

// Step 1 start n proxies for all available configurations
let dispatch = require('./dispatchCaller.js');
console.log("Hello");


// Step 2 Call TaskRunner with the modified
var runner = new TaskRunner( taskEnvironment );
runner.execute();