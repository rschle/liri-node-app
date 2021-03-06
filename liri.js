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


//creating functions for each


function concertThis(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
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
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log("An error has occurred.")
        } else {
            console.log("Main Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name + space);
        }

    })
}

function movieThis(movie) {
    if (movie) {
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


//need to make the commands
if (command === "concert-this") {
    var artist = process.argv.slice(3).join("");
    concertThis(artist);

} if (command === "spotify-this") {
    var song = process.argv.slice(3).join("");
    var space = "\n" + "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
    if (!song) {
        song = "The Sign Ace of Base"
    }
    spotifyThis(song);
}
if (command === "movie-this") {
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
    }
    movieThis(movie);
}

if (command === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        var command;
        var query;
        if (err) {
            console.log("An error has occured.");
        }
        //seeing if there is a comma in between the command and the query (thing we're searching) 
        // (index of -1 means not in the array and !== -1 would allow us to see if the comma has an index in the array)
        // for for this if statement, we recognize the command and query as parts of the array separated by this comma
        if (data.indexOf(",") !== -1) {
            var dataArray = data.split(",");
            command = dataArray[0];
            query = dataArray[1]
        } else {
            command = data;
        }

        if (command === "concert-this") {
            concertThis(query);
        } else if (command === "spotify-this-song") {
            spotifyThis(query);
        } else if (command === "movie-this") {
            movieThis(query);
        } else {
            console.log("Command not found.");
        }


    })
};