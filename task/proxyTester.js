// Author: Siavash Khan || RazeByte
"use strict";

var taskEnvironment = require('./environment.json');
var TaskRunner = require('./lib/TaskRunner');

// Step 1 start n proxies for all available configurations
let DispatchCaller = require('./dispatchCaller.js');
let dispatch = new DispatchCaller();

var x, address, addrCombos, port;
addrCombos = dispatch.getNetworkAddressCombinations();
for (x = 0; x < addrCombos.length; x++) {
	port = dispatch.getFreePort();
	dispatch.startHTTPProxy(addrCombos[x], port);
	console.log("\n");
}


// Step 2 Call TaskRunner with the modified
var runner = new TaskRunner( taskEnvironment );
runner.execute();