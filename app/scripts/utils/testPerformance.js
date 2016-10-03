import {extend} from './utils';

var testPerformance = function(testName, testFunc, options){


	var defaults = {
		maxExecutionTime: 2000,
		maxCycles: 100
	};

	var options = extend(defaults, options);
	
	return new Promise( (resolve, reject) => {

		var measurements = {
			runs:[],
			totalExecutionTime:0,
		};

		console.log(`test started: ${testName}`)

		var cycleStart = performance.now();
		var totalTime = 0;

		for (var cycle = 0; cycle < options.maxCycles; cycle++) {

			var funcExecutionTime = measureExecutionTime(testFunc);
			measurements.runs.push(funcExecutionTime);

			totalTime = performance.now() - cycleStart;
			// console.log(`totalTime: ${totalTime}`);
			if( totalTime  > options.maxExecutionTime ) break;

		}

		measurements.totalExecutionTime = totalTime;

		logTestResults(testName, measurements);
	
		resolve();

	} );

}

function measureExecutionTime(testFunc){

	var start = performance.now();

	testFunc();

	return performance.now() - start;

}

function logTestResults(testName, measurementsObj ){

	var runs = measurementsObj.runs,
		totalTime = measurementsObj.totalExecutionTime;

	var minExecutionTime = Math.min.apply( Math, runs );
	var maxExecutionTime = Math.max.apply( Math, runs );

	var total1ExecutionTime = runs.reduce(function(a, b) { return a + b; });
	var averageExecutionTime = total1ExecutionTime / runs.length;
	
	console.log('\n');
	// test: name
	console.log(`test: ${testName}`);
	// --------------------
	console.log(`----------------`);
	// min execution time:
	console.log(`minExecutionTime: ${minExecutionTime}`);
	// max execution time:
	console.log(`maxExecutionTime: ${maxExecutionTime}`);
	// average execution time: 
	console.log(`averageExecutionTime: ${averageExecutionTime}`);
	// median execution time:
	// total execution time:
	console.log(`total1ExecutionTime: ${total1ExecutionTime}`);
	// total 2 execution Time
	console.log(`totalExecutionTime: ${totalTime}`);
	// runs:
	console.log(`numbers of function executions: ${runs.length}`);


}

export default testPerformance;