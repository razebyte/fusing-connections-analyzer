// Author: Siavash Khan || RazeByte

'use strict';

require('./dispatchCaller.js');

var taskEnvironment = require('./environment.json');
var TaskRunner = require('./lib/TaskRunner');

// Step 1 start n proxies for all available configurations


// Step 2 Call TaskRunner with the modified
var runner = new TaskRunner( taskEnvironment );
runner.execute();