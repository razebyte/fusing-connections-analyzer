// Author: Siavash Khan || RazeByte
"use strict";

var TaskRunner = require('./lib/TaskRunner');

// Step 1 start n proxies for all available configurations
let DispatchCaller = require('./dispatchCaller.js');
let dispatch = new DispatchCaller();

const fs = require('fs'); // file-system

var x, address, addrCombos, port, runner;
addrCombos = dispatch.getNetworkAddressCombinations();
for (x = 0; x < addrCombos.length; x++) {
	port = dispatch.getFreePort();
	dispatch.startHTTPProxy(addrCombos[x], port);

	// Step 2 Call TaskRunner with the modified
	let rawData = fs.readFileSync("environment.json");
	let taskEnvironment = JSON.parse(rawData);
	taskEnvironment["proxy"]["port"] = port;
	runner = new TaskRunner(taskEnvironment);
	runner.execute();
	console.log("\n");
}
