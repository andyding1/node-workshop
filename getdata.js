Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

var request = require('request');
var prompt = require('prompt');


prompt.message = "Please enter your location: ".rainbow;
prompt.start();

    //Prompt for location
    prompt.get(['location'], function (err, result) {
        if(!err){
            //Request location based off prompt using googlemap API
            request("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.location, function(err, res, body){
                if (!err){
                    //Get lat and lng of location
                    var addressInfo = JSON.parse(body);
                    var addressLat = addressInfo['results'][0].geometry.location.lat;
                    var addressLng = addressInfo['results'][0].geometry.location.lng;
                    console.log("The location provided is at: " + addressLat.toFixed(2) + " x " + addressLng.toFixed(2));
                    //Request ISS Location
                    request("http://api.open-notify.org/iss-now.json", function(err, res, body) {
                        if (!err) {
                            var issInfo = JSON.parse(body);
                            var issLat = issInfo.iss_position.latitude;
                            var issLng = issInfo.iss_position.longitude;
                            console.log("The ISS is now at: " + issLat.toFixed(2) + " x " + issLng.toFixed(2));

                            //Get the distance between ISS and inputted location
                            var R = 6371000; // metres
                            var φ1 = issLat.toRadians();
                            var φ2 = addressLat.toRadians();
                            var Δφ = (addressLat-issLat).toRadians();
                            var Δλ = (addressLng-issLng).toRadians();
                            
                            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                                    Math.cos(φ1) * Math.cos(φ2) *
                                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                            
                            var d = R * c;
                            console.log("The distance between ISS and " + result.location +  ": " + d + " meters.");
                        }
                        else {
                            console.log("there was an error getting iss location: " + err);
                        }
                    });
                    //Calculate distance between location input and ISS
                    
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
    

