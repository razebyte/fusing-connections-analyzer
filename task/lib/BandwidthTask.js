var http = require('http');
var url = require('url');

class BandwidthTask {
	constructor( environment ) {
		this.environment = BandwidthTask.validateEnvironment(
			environment
		);
	}

	static validateEnvironment( env ) {
		if( typeof env.targetFile === 'undefined' ) {
			throw new Error("\"environment.json\" is missing targetFile");
		}

		if( typeof env.proxy === 'undefined' ) {
			throw new Error("\"environment.json\" is missing the proxy data");
		}
		return env;
	}

	async execute() {
		console.log('Beginning download of file');
		var startTime, endTime;
		startTime = (new Date()).getTime();
		var cacheBuster = "?nnn=" + startTime;
		var speedLogInterval = 1000;
		var speedLog = [];
		var results = {
			start: Date.now()
		};

		var targetFile = this.environment.targetFile.location + cacheBuster;

		// This is the vital part of our tool.
		// These options allow node to complete the request against the proxy
		var options = {
			host: this.environment.proxy.host,
			port: this.environment.proxy.port,
			path: targetFile,
			headers: {
				Host: url.parse(targetFile).hostname
			}
		};

		return new Promise((resolve, reject) => {
			http.request(options, function (res) {
				var size = 0;
				var lastIntervalSize = 0;
				var measureSpeed = setInterval(function () {
					if (lastIntervalSize === size) return;
					speedLog.push(Math.round((size - lastIntervalSize) / (speedLogInterval) * 100) / 100);
					lastIntervalSize = size;
				}, speedLogInterval);

				res.setEncoding('utf8');

				res.on('data', function (chunk) {
					if (size === 0) {
						results.firstByte = results.firstByte || Date.now();
					}
					size += chunk.length;
					// process.stdout.write(Math.round(size / 1024) + 'kb ');
				});

				res.on('end', function () {
					clearInterval(measureSpeed);
					results.data = {
						latency: (results.firstByte - results.start),
						dataSizeKB: size / 1024,
						avgThroughput: Math.round(size / (Date.now() - results.firstByte) * 100) / 100,
						maxThroughput: Math.max.apply(null, speedLog),
						minThroughput: Math.min.apply(null, speedLog)
					};
					console.log('Finished download of file');
					
					resolve(results.data);
				});
			}).end();
		});
	};
}

module.exports = BandwidthTask;