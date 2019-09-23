require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

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
    for (var i=0; i<res.data.length;i++){
        console.log("Venue Name: ", res.data[i].venue.name);
        console.log("Venue Location: ", res.data[i].venue.city);
        var date=moment(res.data[i].datetime);
        console.log("Concert Date: ", date.format("MM/DD/YYYY"));
        console.log("________________________________")
    }
  })
  //catch was working (would console log the error message) before I added loop
  // to iterate through all concerts but not anymore. Logging the error was not
  // a requirement so I'm leaving the code here but not worrying about fixing it now
  .catch(function(error){
    if(error.res){
      console.log(error.res);
    }else if(error.request){
      console.log("Sorry, we weren't able to find any upcoming concerts for the artist you entered. Please try again.")
    } 
    console.log("Sorry, we weren't able to find any upcoming concerts for the artist you entered. Please try again.")
  });  
}


function spotifyThis(search) {
  if (!search){
    search= "The Sign";
  }  
  spotify.search({type: "track", query: search})
    .then(function(res){
      console.log("Artist Name/s: ", res.tracks.items[0].album.artists[0].name);
      console.log("Song Name: ", res.tracks.items[0].name);
      console.log("Link to song preview: ", res.tracks.items[0].external_urls.spotify);
      console.log("Album: ", res.tracks.items[0].album.name);
    })
    .catch(function(error){
      console.log(error)
    })
}

function movieThis(search) {
  axios.get("http://www.omdbapi.com/?t=" + search + "&apikey=8de1603b&s")
    .then(function (res) {
      if (res.data.Title === undefined) {
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
        console.log("It's on Netflix!")
        console.log("PS- you need to type in a movie title to get data for anything other than Mr. Nobody!")
      } else {
        console.log("Title: ", res.data.Title);
        console.log("Year: ", res.data.Year);
        console.log("IMDB Rating: ", res.data.imdbRating);
        console.log("Rotten Tomatoes Rating: ", res.data.Ratings[1].Value);
        console.log("Country: ", res.data.Country);
        console.log("Language: ", res.data.Language);
        console.log("Plot: ", res.data.Plot);
        console.log("Actors: ", res.data.Actors);
      }
    });
}

function doThisTXT() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if(error){
      console.log(error)
    }
    var input=data.split(",");
    command=input[0];
    search=input[1]
    userInput(command,search);
    console.log(data)
  })
}
