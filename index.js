const spotifyAPI = require("spotify-web-api-node");
const spotify = new spotifyAPI();
const json2csv = require("json2csv").parse;
const fields = ["playlistname", "albumname", "artist", "trackname"];
const opts = { fields };
var myPlaylistData = [];

// To get an access token or refreh it clone the git repo:
// https://github.com/spotify/web-api-auth-examples and run the node app with your clientId / clientSecret
// ClientID/Secret see https://developer.spotify.com/dashboard/applications


spotify.setAccessToken("BQANMB4w6ZxpSYbc7mT9q-SFuluyv6z3L9SHyQteFGy4rQUJuA8M3LxcyljvRjarH1tMv2C8yAPAqKERCK5H3JJyVQnsw7kOx88AtDobaXls7mT6j-W_SmR5-ozVBxZNiEtsGTEDCGSBNZ8YNpfIL_suyqF069GZBk6G&refresh_token=AQC5P4nEurM-Vi9o5BnDF27cElOEFniAugWjFfX7K-LPq6gXqTHSX883HTNKz2iLIub7Pz5aPSyNHDJocLXaXmfc3mn5at9f66E6pzvOA0ArnxjpFrsn8DkTrjp7qrEvJlXBNA");


spotify.getUserPlaylists("1135449039", { offset: 0, limit: 50 })
    .then(function (data) {
        console.log("Number of playlists", data.body.items.length);
        data.body.items.forEach(element => {
            //console.log(element.name);
            var playlistname = element.name;
            spotify.getPlaylist(element.id)
                .then(function (playlistData) {
                    playlistData.body.tracks.items.forEach((track, key, arr) => {
                        var trackInfo = {};
                        trackInfo.playlistname = playlistname;
                        trackInfo.albumname = track.track.album.name;
                        trackInfo.artist = track.track.artists[0].name;
                        trackInfo.trackname = track.track.name;
                        myPlaylistData.push(trackInfo);
                        if (Object.is(arr.length - 1, key)) {
                            printCSV();
                        }
                    });
                }, function (err) {
                    console.error(err);
                });
        });
        
    }, function (err) {
        console.error(err);
    });


function printCSV() {
    try {
        const csv = json2csv(myPlaylistData, opts);
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
}


/**
     * 
     * spotifyApi
  .getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  .then(function(data) {
    return data.body.tracks.map(function(t) {
      return t.id;
    });
  })
  .then(function(trackIds) {
    return spotifyApi.getTracks(trackIds);
  })
  .then(function(data) {
    console.log(data.body);
  })
  .catch(function(error) {
    console.error(error);
  });
     * 
     */

