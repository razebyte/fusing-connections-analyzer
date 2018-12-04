/**
 * Dashboard 1: Morris-chart
 *
 * This is the code that will read the data and format it for Morris.js
 */

var urlToJsonDb = "https://raw.githubusercontent.com/razebyte/fusing-connections-analyzer/master/task/results.database.json";
var connections;
var bandwidthTaskMetrics;
$.getJSON(urlToJsonDb, function(data) {
	bandwidthTaskMetrics = [
		'latency',
		'dataSizeKB',
		'avgThroughput',
		'maxThroughput',
		'minThroughput'
	];

	 connections = Object.keys(data);
console.log(connections);
	var allDates = [].concat.apply([],connections.map(function(c) { return Object.keys(data[c]) }));

	bandwidthTaskMetricResults = {};
	bandwidthTaskMetrics.forEach(function(metric) { bandwidthTaskMetricResults[metric] = []});

	for(var i = 0; i < allDates.length; i++){
		var date = allDates[i];
		bandwidthTaskMetrics.forEach(function(metric) {
			bandwidthTaskMetricResults[metric].push(
				{
					period: date,
					item1: getResultPerDate(data, connections[0], date).result[metric],
					item2: getResultPerDate(data, connections[1], date).result[metric],
					item3: getResultPerDate(data, connections[2], date).result[metric],
				}
			)
		});
	}

	// TODO: Tie this to the radio buttons or something
	setTopGraph(
		bandwidthTaskMetricResults.avgThroughput,
		connections
	);

setfirstConnectionGraph();
	setBottomGraph();
});

var getResultPerDate = function(data, connection, date) {
	var result = data[connection][date];
	if(typeof result === 'undefined') {
		result = [
			{
				result: {
					latency: undefined,
					dataSizeKB: undefined,
					avgThroughput: undefined,
					maxThroughput: undefined,
					minThroughput: undefined
				}
			}
		]
	}
	return result[0];
}

var setTopGraph = function( incomingData, connectionLabels ) {
	Morris.Line(
		{
			// Required Fields
			element: 'extra-area-chart',
			data: incomingData,
			xkey: 'period',
			xlabels: '30sec',
			ykeys: ['item1', 'item2', 'item3'],
			labels: connectionLabels,

			// Styling
			pointSize: 1,
			fillOpacity: 0.80,
			pointStrokeColors: ['#FF0000', '#00FF00', '#0000FF'],
			lineColors: ['#FF0000', '#00FF00', '#0000FF'],
			gridLineColor: '#e0e0e0',
			lineWidth: 1,
			hideHover: 'auto',
			parseTime: true,
			resize: true,
			smooth: true
		}
	);
}

var setfirstConnectionGraph = function() {
	$("#firstConnectionGraph").empty();
	 Morris.Line(
		{
			// Required Fields
			element: 'firstConnectionGraph',
			data: bandwidthTaskMetricResults.avgThroughput,
			xkey: 'period',
			xlabels: '30sec',
			ykeys: ['item1'],
			labels: connections,

			// Styling
			pointSize: 1,
			fillOpacity: 0.80,
			pointStrokeColors: ['#FF0000', '#00FF00', '#0000FF'],
			lineColors: ['#FF0000', '#00FF00', '#0000FF'],
			gridLineColor: '#e0e0e0',
			lineWidth: 1,
			hideHover: 'auto',
			parseTime: true,
			resize: true,
			smooth: true
		}
	);
}




var setSecondConnectionGraph = function() {
	$("#firstConnectionGraph").empty();
	 Morris.Line(
		{
			// Required Fields
			element: 'firstConnectionGraph',
			data: bandwidthTaskMetricResults.avgThroughput,
			xkey: 'period',
			xlabels: '30sec',
			ykeys: ['item2'],
			labels: connections,

			// Styling
			pointSize: 1,
			fillOpacity: 0.80,
			pointStrokeColors: ['#00FF00'],
			lineColors: ['#00FF00'],
			gridLineColor: '#e0e0e0',
			lineWidth: 1,
			hideHover: 'auto',
			parseTime: true,
			resize: true,
			smooth: true
		}
	);
}


var setthirdConnectionGraph = function() {
	$("#firstConnectionGraph").empty();
	Morris.Line(
		{
			// Required Fields
			element: 'firstConnectionGraph',
			data: bandwidthTaskMetricResults.avgThroughput,
			xkey: 'period',
			xlabels: '30sec',
			ykeys: ['item3'],
			labels: connections,

			// Styling
			pointSize: 1,
			fillOpacity: 0.80,
			pointStrokeColors: ['#0000FF'],
			lineColors: ['#0000FF'],
			gridLineColor: '#e0e0e0',
			lineWidth: 1,
			hideHover: 'auto',
			parseTime: true,
			resize: true,
			smooth: true
		}
	);
}



var setBottomGraph = function() {
	var data = [
		{
			period: '2018-12-01T07:42:06.767Z',
			item1: 469,
			item2: 150,
			item4: 50
		},
		{
			period: '2018-12-01T07:43:11.735Z',
			item1: 406,
			item2: 150,
			item4: 50
		},
		{
			period: '2018-12-01T07:44:17.241Z',
			item1: 512,
			item2: 150,
			item4: 50
		},
		{
			period: '2018-12-01T07:45:18.959Z',
			item1: 395,
			item2: 150,
			item4: 50
		},
		{
			period: '2018-12-01T07:46:19.095Z',
			item1: 384,
			item2: 150,
			item4: 50
		},
		{
			period: '2018-12-01T07:47:11.259Z',
			item1: 351,
			item2: 150,
			item4: 50
		},
		{
			period: '2018-12-01T07:48:15.791Z',
			item1: 417,
			item2: 150,
			item4: 50
		}
	];
	Morris.Area(
		{
			element: 'morris-area-chart',
			data: data,
			xkey: 'period',
			ykeys: ['item1', 'item2', 'item4'],
			labels: ['Bandwidth Task', 'Ping  Task', 'Both'],
			pointSize: 0,
			fillOpacity: 0.99,
			pointStrokeColors: ['#65b12d', '#933EC5 ', '#006DF0'],
			behaveLikeLine: true,
			gridLineColor: '#e0e0e0',
			lineWidth: 0,
			hideHover: 'auto',
			lineColors: ['#65b12d', '#933EC5 ', '#006DF0'],
			resize: true
		}
	);
}
