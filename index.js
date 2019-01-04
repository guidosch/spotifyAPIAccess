const spotifyAPI = require("spotify-web-api-node");
const spotify = new spotifyAPI();
const json2csv = require("json2csv").parse;
const fields = ["playlistname", "albumname", "artist", "trackname"];
const opts = { fields };
var myPlaylistData = [];

// To get an access token or refreh it clone the git repo:
// https://github.com/spotify/web-api-auth-examples and run the node app with your clientId / clientSecret
// ClientID/Secret see https://developer.spotify.com/dashboard/applications


spotify.setAccessToken("BQAI11mccABEAT1QlybIWOpcSsaG6QSIiWfWIkzQRdH6lsJUUemsaK5n-FBEKC6ZAmEi4ebcCiHc8WvbANzRCzHZisJiC7OVVDx7nfVE5aAkzvCoraZJJnA5jDJ__RmWe4JXiT0r1gMn2QZH2eFeh5WDb6D_4yAm4Mij&refresh_token=AQBk3z79MsrF616AIduvsrhnOOb-8_Dk8gwKdVd5Zn1dhpekTLoCie0rpcFL5SMuZ2ZDAogsq32Vy31o5nQil0Gwz0mFvzoCQEmyq-yFFbP5n-K5OWh1eiELHG2i6COGd3MSfQ");

//max limit is 50
spotify.getUserPlaylists("1135449039", { offset: 0, limit: 50 })
    .then(function (data) {
        console.log("Number of playlists", data.body.items.length);
        data.body.items.forEach((element) => {
            if (element.owner.id === "1135449039"){
                var playlistname = element.name;
                spotify.getPlaylist(element.id)
                    .then(function (playlistData) {
                        playlistData.body.tracks.items.forEach((track) => {
                            var trackInfo = {};
                            trackInfo.playlistname = playlistname;
                            trackInfo.albumname = track.track.album.name;
                            trackInfo.artist = track.track.artists[0].name;
                            trackInfo.trackname = track.track.name;
                            trackInfo.id = track.track.id;
                            myPlaylistData.push(trackInfo);
                        });
                    }, function (err) {
                        console.error(err);
                    }).then(function () {
                        //TODO der promise wird noch nach jeder iteration aufgerufen
                        console.log("done");
                        printCSV(removeDuplicates());
                    });
            }
        });
        
    }, function (err) {
        console.error(err);
    });


function removeDuplicates() {
    return myPlaylistData.filter((object,index) => 
        index === myPlaylistData.findIndex(obj => 
            JSON.stringify(obj) === JSON.stringify(object)));
}
function printCSV(data) {
    try {
        const csv = json2csv(data, opts);
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
}
