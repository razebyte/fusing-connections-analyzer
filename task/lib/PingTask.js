var ping = require('ping');

class PingTask {
	constructor( environment ) {
		this.environment = PingTask.validateEnvironment( 
			environment 
		);
	}

	static validateEnvironment( env ) {
		if( typeof env.pingRemote === 'undefined' ) {
			throw new Error("\"environment.json\" is missing ping remote");
		}
		return env;
	}

	static pingConfiguration() {
		return {
			timeout: 10,
			min_reply: 3
		}
	}

	async execute() {
		return ping.promise.probe( this.environment.pingRemote, PingTask.pingConfiguration );
	};
}

module.exports = PingTask;