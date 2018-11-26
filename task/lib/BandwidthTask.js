var http = require('http');
var fs = require('fs');

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
		return env;
	}

	async execute() {
		var startTime, endTime;
		startTime = (new Date()).getTime();
		var cacheBuster = "?nnn=" + startTime;
		var uri = this.environment.targetFile.location + cacheBuster;

		return new Promise((resolve, reject) => {

			http.get(uri, response => {
				var data = '';
				response.on('data', d => data+=d);
				response.on('end', () => {

					console.log(data);

					endTime = (new Date()).getTime();
					var duration = (endTime - startTime) / 1000;
					var bitsLoaded = this.environment.targetFile.size * 8;
					var speedBps = (bitsLoaded / duration).toFixed(2);
					var speedKbps = (speedBps / 1024).toFixed(2);
					var speedMbps = (speedKbps / 1024).toFixed(2);

					resolve({
						"speedBps": speedBps,
						"speedKbps": speedKbps,
						"speedMbps": speedMbps
					});

				})
			});

		});
	};
}

module.exports = BandwidthTask;