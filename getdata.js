var request = require('request');
var prompt = require('prompt');

//Request ISS Location
request("http://api.open-notify.org/iss-now.json", function(err, res, body) {
    if (!err) {
        var issInfo = JSON.parse(body);
        
        console.log("The ISS is now at: " + issInfo.iss_position.latitude.toFixed(2) + " x " + issInfo.iss_position.longitude.toFixed(2));
    }
    else {
        console.log("there was an error getting iss location: " + err);
    }
});

//Prompt for location
setTimeout(function(){
    prompt.message = "Please enter your location: ".rainbow;
    
    prompt.start();
    
    var getLocation = prompt.get(['location'], function (err, result) {
            if(!err){
                //Request location based off prompt using googlemap API
                request("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.location, function(err, res, body){
                    if (!err){
                        var addressInfo = JSON.parse(body);
                        console.log("The location provided is at: " + addressInfo['results'][0].geometry.location.lat + " x " + addressInfo['results'][0].geometry.location.lng);
                    }
                    else {
                        console.log("there was an error in the google map api: " + err);
                    }
                });
            }
            else{
                console.log("there was an error in the prompt: " + err);
            }
          });
    
}, 3000);
