require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

