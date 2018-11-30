var BandwidthTask = require('./BandwidthTask');
var PingTask = require('./PingTask');

/** 
 * TaskRunner.js
 *
 * This will be a file that will contain the code that will execute a suite of Client QoS Tests.
 * 
 * These tests will be delegated to other task scripts, 
 * but this main one will delegate an environment to other tests to run against.
 */
class TaskRunner {
	constructor( environment, proxy, proxyIdentifier ) {
		this.environment = BandwidthTask.validateEnvironment(
			environment
		);
		this.proxy = proxy;
		this.proxyIdentifier = proxyIdentifier;
	}

	static validateEnvironment( env ) {
		//TODO: Validation on environment json
		return env;
	}

	async execute() { 
		var tasks = [
			new BandwidthTask( this.environment ),
			new PingTask( this.environment )
		];

		return new Promise( (resolve,reject) => {
			Promise.all( 
				tasks.map(
					task => task.execute()
				) 
			).then( value => {
				this.proxy.server.close();

				var keyedByExecutionTime = {};
				keyedByExecutionTime[new Date().toISOString()] = value;
				resolve({
					id: this.proxyIdentifier,
					data: keyedByExecutionTime
				});
			}).catch(reject);
		});
	};
}

module.exports = TaskRunner;