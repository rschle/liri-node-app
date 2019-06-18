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
if (command === "concert-this") {
    var artist = process.argv.slice(3).join("");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios
        .get(queryURL)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                //venue name
                console.log("Venue Name: " + response.data[i].venue.name);
                //location
                if (response.data[i].venue.region) {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
                }
                else {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country)
                }
                console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            }
        })
} else if (command === "spotify-this") {
    var song = process.argv.slice(3).join("");
    var space = "\n" + "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
    if (!song) {
        song = "The Sign"
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                console.log("An error has occurred.")
            } else {
                console.log("Main Artist: " + data.tracks.items[5].artists[0].name);
                console.log("Song Name: " + data.tracks.items[5].name);
                console.log("Preview Link: " + data.tracks.items[5].preview_url);
                console.log("Album Name: " + data.tracks.items[5].album.name + space)
            }
        })
    } else {
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                console.log("An error has occurred.")
            } else {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    // console.log(data.tracks.items[i]);
                    console.log("Main Artist: " + data.tracks.items[i].artists[0].name);
                    console.log("Song Name: " + data.tracks.items[i].name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);
                    console.log("Album Name: " + data.tracks.items[i].album.name + space);
                }

            }
        })
    }
}
else if (command === "movie-this") {
    var movie = process.argv.slice(3).join("");
    if (!movie) {
        movie = "Mr. Nobody"
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
        axios
            .get(queryURL)
            .then(function (response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("imdb Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
    } if (movie) {
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
        axios
            .get(queryURL)
            .then(function (response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("imdb Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
    } else if (error) {
        console.log("An error has occured.")
    }
}

// }else if(command === "do-what-it-says"){

//  }