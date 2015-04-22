var http = require("http"),
    https = require('https'),
    querystring = require("querystring");


module.exports = {
	host : "auth0.com",
	setHost : function(host) {
		this.host = host;
	},
	setClientId : function(client_id) {
		this.client_id = client_id;
	},
	setConnection : function(connection) {
		this.connection = connection;
	},
	loginWithEmailAndPassword : function(username, password, cb) {
		http_request(this.host, "/oauth/ro", "POST", {
		  "client_id":   this.client_id,
		  "username":    username,
		  "password":    password,
		  "connection":  this.connection,
		  "grant_type":  "password",
		  "scope":       "openid"
		}, true, function(err, content) {
			if(err) {
				cb(err);
				return;
			}
			cb(null, JSON.parse(content));
		})
	}
}

function http_request(host, path, method, params, secure, cb) {
	var http_client = secure ? https : http;
	var options = {
		hostname: host,
		port: secure ? 443 : 80,
		path: path,
		method: method,
		headers : {
			'Content-Type': 'application/json'
		}
	};
	var req = http_client.request(options, function(res) {
		if(cb) {
			var content = "";
			res.on('data', function(str) {
				content += str;
			});
			res.on('end', function() {
				cb(null, content);
			});
		}
	});
	req.setTimeout(5000);
	req.on('timeout', function() {
		if(cb) cb(new Error("timed out"), null);
		req.abort();
	});
	req.on('error', function(err) {
		if(cb) cb(err, null);
	});
	req.write( JSON.stringify(params) );
	req.end();
}

