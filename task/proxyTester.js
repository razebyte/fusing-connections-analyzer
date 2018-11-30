// Author: Siavash Khan || RazeByte
"use strict";

const fs = require('fs'); // file-system
const TaskRunner = require('./lib/TaskRunner');
const DispatchCaller = require('./lib/DispatchCaller.js');

let dispatch = new DispatchCaller();

var x, address, addrCombos, port, runner;
addrCombos = dispatch.getNetworkAddressCombinations();
for (x = 0; x < addrCombos.length; x++) {
	port = dispatch.getFreePort();
	var proxy = dispatch.startHTTPProxy(addrCombos[x], port);

	// Step 2 Call TaskRunner with the modified
	let rawData = fs.readFileSync("environment.json");
	let taskEnvironment = JSON.parse(rawData);
	taskEnvironment.proxy.port = port;
	new TaskRunner(taskEnvironment)
		.execute()
		.then( (a,b) => {
			proxy.server.close();
		});
}
