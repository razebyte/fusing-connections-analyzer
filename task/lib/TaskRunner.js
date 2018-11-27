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
	constructor( environment ) {
		this.environment = BandwidthTask.validateEnvironment(
			environment
		);
	}

	static validateEnvironment( env ) {
		//TODO: Validation on environment json
		return env;
	}

	static writeResults( results ) {
		//TODO: Write the results to a JSON file or just console it
		console.log("============ Writing Results ============");
		console.log( results );
	}


	async execute() { 
		var tasks = [
			new BandwidthTask( this.environment ),
			new PingTask( this.environment )
		];

		Promise.all( 
			tasks.map(
				task => task.execute()
			) 
		).then( 
			value => TaskRunner.writeResults(value) 
		);
	};
}

module.exports = TaskRunner;