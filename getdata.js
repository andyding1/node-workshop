var request = require('request');

request("http://api.open-notify.org/iss-now.json", function(err, res, body) {
    if (!err) {
        var issInfo = JSON.parse(body);
        
        console.log("The ISS is now at: " + issInfo.iss_position.latitude.toFixed(2) + " x " + issInfo.iss_position.longitude.toFixed(2));
    }
    else {
        console.log("there was an error: " + err);
    }
});