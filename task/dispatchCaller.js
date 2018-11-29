// Author: Siavash Khan || RazeByte

var HttpProxy, Logger, SocksProxy, crypto, inspect, logger, os, pkg, program,
  __slice = [].slice;

var path = "./node_modules/dispatch-proxy/";

os = require('os');
inspect = require('util').inspect;
crypto = require('crypto');
program = require('commander');
Logger = require('tmpl-log');

// Dispatch Proxy
SocksProxy = require(path + "lib/proxy/socks");
HttpProxy = require(path + "lib/proxy/http");
pkg = require(path + "/package");

logger = new Logger({
  tab: 10,
  gutter: ' '
}).registerTag('b', ['bold']).registerTag('s', ['green']).registerTag('i', ['cyan']).registerTag('e', ['red']).registerTag('a', ['b', 'underline']).registerEvent('request', '<b><i>request').registerEvent('dispatch', '<b><i>dispatch').registerEvent('connect', '<b><s>connect').registerEvent('response', '<b><s>response').registerEvent('error', '<b><e>error').registerEvent('end', '<b><i>end').registerMode('default', ['error']).registerMode('debug', true);

class DispatchCaller {

	constructor() {
		this.freePort = 1080;
	}

	getFreePort() {
		this.freePort += 1;
		return (this.freePort - 1);
	}

	//console.log(JSON.stringify(addrs, null, 4));

	startHTTPProxy(addresses, port) {
		var port, type, execAddresses, priority, proxy, host;

		host || (host = 'localhost');
		port || (port = 8080);
	    type = 'HTTP';

	    execAddresses = [];
	    priority = 1;
	    for (var i = 0; i < addresses.length; i++) {
	    	execAddresses.push({
		    	address: addresses[i],
		    	priority: priority
		    });
	    }

	    proxy = new HttpProxy(execAddresses, port, host);
	    proxy.on('request', function(_arg1) {
	      var clientRequest, id, localAddress, serverRequest;
	      clientRequest = _arg1.clientRequest, serverRequest = _arg1.serverRequest, localAddress = _arg1.localAddress;
	      id = (crypto.randomBytes(3)).toString('hex');
	      logger.emit('request', "[" + id + "] <a>" + clientRequest.url + "</>");
	      logger.emit('dispatch', "[" + id + "] <a>" + localAddress + "</>");
	      serverRequest.on('response', function(serverResponse) {
	        return logger.emit('response', "[" + id + "] <magenta><b>" + serverResponse.statusCode + "</></>");
	      }).on('error', function(err) {
	        return logger.emit('error', "[" + id + "] clientRequest\n" + (escape(err.stack)));
	      }).on('end', function() {
	        return logger.emit('end', "[" + id + "] serverRequest");
	      });
	      return clientRequest.on('error', function(err) {
	        return logger.emit('error', "[" + id + "] clientRequest\n" + (escape(err.stack)));
	      }).on('end', function() {
	        return logger.emit('end', "[" + id + "] clientRequest");
	      });
	    }).on('error', function(err) {
	      return logger.emit('error', "server\n" + (escape(err.stack)));
	    });
	    logger.log("<b><magenta>" + type + "</></> server started on <a>" + host + "</><b>:" + port + "</>\nDispatching to address:\n");
	    var addrs = "";
    	for (var a = 0; a < addresses.length; a++) {
    		addrs += addresses[a];
    		if (addresses.length != 1 && a != addresses.length - 1) {
    			addrs += "\n";
    		}
    	}
    	logger.log(addrs);
	}

	getNetworkAddresses() {
		var addrs, connection, address, interfaces, name, networkAddresses, i;
  		networkAddresses = [];
  		interfaces = os.networkInterfaces();
  		for (name in interfaces) {
  			addrs = interfaces[name];
  			for (i = 0; i < addrs.length; i++) {
  				connection = addrs[i];
  				if (connection["family"] != "IPv6") {
  					networkAddresses.push(connection["address"]);
  				}
  			}
  		}
  		return networkAddresses;
	}

	getNetworkAddressCombinations() {
		var networkAddresses, naSet, naComboSet, x, y;
		networkAddresses = this.getNetworkAddresses();
		naSet = [];
		naComboSet = [];
		for (x = 0; x < networkAddresses.length; x++) {
			naSet.push(networkAddresses[x]);

			if (x == networkAddresses.length - 1) {
				naComboSet.push(naSet);
				break; // prevents powerset
			}

			for (y = (x+1); y < networkAddresses.length; y++) {
				naSet.push(networkAddresses[y]);
			}
			naComboSet.push(naSet);
			naSet = [];
		}
		return naComboSet;
	}

	printArray(arr) {
		for (var i = 0; i < arr.length; i++) {
			console.log(JSON.stringify(arr[i], null, 4));
		}
	}

}

let d = new DispatchCaller();
//d.startHTTPProxy(["192.168.0.11", "192.168.5.15"], d.getFreePort());
