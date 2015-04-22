var MilkCocoa = require("milkcocoa");
var auth0 = require("./auth0wrapper");


auth0.setHost("{auth0 domain}");
auth0.setClientId("{auth0 client id}");
auth0.setConnection("{connection name}");


var milkcocoa = new MilkCocoa("{milkcocoa app id}.mlkcca.com", { file_path : "./" });


milkcocoa.user(function(err, user) {
	console.log(err, user);
	if(user) {
		main(milkcocoa);
	}else{
		auth0.loginWithEmailAndPassword("{email address}", "{password}", function(err, data) {
			milkcocoa.authWithToken(data.id_token, function(err, user){
				main(milkcocoa);
			});
		});
	}
});



function main(milkcocoa) {
	var ds = milkcocoa.dataStore("logs");

	ds.get("e2s6dvrrftl0mpulq", function(e) {
		console.log(e);
	});

	ds.on("push", function(r) {
		console.log("a", r);
	});

	setInterval(function() {
		ds.push({date : new Date().getTime(), content : "a"});
	}, 1000);	
}




