var MilkCocoa = require("milkcocoa");
var auth0 = require("./auth0wrapper");


auth0.setHost("milkcocoa.auth0.com");
auth0.setClientId("z2RcQboX6E8c2yxUPZIqPaA6rdQdXQUF");
auth0.setConnection("devices");

var milkcocoa = new MilkCocoa("unii8fmjtlc.mlkcca.com", {
	file_path : "./"
});

milkcocoa.user(function(err, user) {
	console.log(err, user);
});

auth0.loginWithEmailAndPassword("syuhei176@gmail.com", "universe", function(err, data) {
	milkcocoa.authWithToken(data.id_token, function(err, user){
		console.log(user);
		main(milkcocoa);
	});
});


function main(milkcocoa) {
	var ds = milkcocoa.dataStore("logs");

	ds.on("push", function(r) {
		console.log(r);
	});

	setInterval(function() {
		ds.push({date : new Date().getTime(), content : "こんにちは"});
	}, 1000);	
}




