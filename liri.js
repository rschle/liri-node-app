//requiring the .env file
require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment")
//spotify 
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


//defining elements of our array (command and query request)
var command = process.argv[2];
var query = process.argv[3];

//need to make the commands
if(command === "concert-this") {
    var artist = process.argv.slice(3).join("");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
axios
    .get(queryURL)
    .then(function(response){
    for(var i = 0; i < response.data.length; i++){
        //venue name
        console.log("Venue Name: " + response.data[i].venue.name);
        //location
        if(response.data[i].venue.region){
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
        }
        else{
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country)
        }
        console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
    }
        // console.log(response.data);
        
        // console.log(response.data.venue.city);
        // console.log(response.data.venue.state);
        // console.log(moment(response.datetime).format("MM/DD/YYYY"));
    })
// }else if(command === "spotify-this"){

// }else if(command === "movie-this"){

// }else if(command === "do-what-it-says"){

 }