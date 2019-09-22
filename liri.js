require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

/*
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
*/

var command = process.argv[2]
var search = process.argv.slice(3).join(" ");
userInput(command, search);

function userInput(command, search) {
  switch (command) {
    case "concert-this": concertThis(search);
      break;
    case "spotify-this-song": spotifyThis(search);
      break;
    case "movie-this": movieThis(search);
      break;
    case "do-what-it-says": doThisTXT();
      break;
    default: console.log("Please enter a valid command to begin search.");
  }
};

function concertThis(search) {
  axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function (res) {
      if (res.data[0].venue === undefined) {
        console.log("Sorry, we weren't able to find any upcoming concerts for the artist you entered")
      } else {

      }
    })
}

function spotifyThis(search) {

}

function movieThis(search) {
  axios.get("http://www.omdbapi.com/?t=" + search + "&apikey=8de1603b&s")
    .then(function (res) {
      if (res.data.Title === undefined) {
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
        console.log("It's on Netflix!")
        console.log("PS- you need to type in a movie title to get data for anything other than Mr. Nobody!")
      } else {
        /* console.log the following
        * Title of the movie.
           * Year the movie came out.
           * IMDB Rating of the movie.
           * Rotten Tomatoes Rating of the movie.
           * Country where the movie was produced.
           * Language of the movie.
           * Plot of the movie.
           * Actors in the movie.
        */
      }
    });
}

function doThisTXT() {

}
