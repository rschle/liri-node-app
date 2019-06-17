//requiring the .env file
require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment")
//spotify 
var spotify = require("node-spotify-api)
var spotify = new Spotify(keys.spotify);


//defining elements of our array (command and query request)
var command = process.argv[2];
var query = process.argv[3];

//need to make the commands
if(command === "concert-this") {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
axios
    .get(queryURL);
    .then(function(response){
        

        console.log("Movie release year: " + response.data.Year);
    })
} else if(command === "spotify-this"){

}else if(command === "movie-this"){

}else if(command === "do-what-it-says"){

}