const spotifyAPI = require("spotify-web-api-node");
const spotify = new spotifyAPI();
const json2csv = require("json2csv").parse;
const fields = ["playlistname", "albumname", "artist", "trackname"];
const opts = { fields };
const myPlaylistData = [];

// To get an access token or refreh it clone the git repo:
// https://github.com/spotify/web-api-auth-examples and run the node app with your clientId / clientSecret
// ClientID/Secret see https://developer.spotify.com/dashboard/applications


spotify.setAccessToken("BQAA_XiNpAnDmgm47nXv4HzVBebiOlFhj_G5JSEpi4Jw24mXdpTzDkWKc3vegwUovSdnLMkIn8MXuZBiRmET4lHMQL5j9XMEKCnHIet-Ede92qXuxuvESEOCfTEZCwlkNEUTTV_X6pEn4ZQ2FySOIiaY7WFkb4WP_Q5S&refresh_token=AQCIwa8JoMcvyNR6xCa3R2ybHV_-YR3fjnIxPeMdNsYdET7WL7_henKEQSGiobmNNQBsm7zkyD1grLhjkGA7hjgyshspXS50l8-7vCKHwdfGBNEIq2PaU2Yef4w4AHLkGZoPwg");


spotify.getUserPlaylists("1135449039", { offset: 0, limit: 5 })
    .then(function (data) {
        console.log("Number of playlists", data.body.items.length);
        data.body.items.forEach(element => {
            console.log(element.name);
            var playlistname = element.name;
            spotify.getPlaylist(element.id)
            .then(function (playlistData) {
                playlistData.body.tracks.items.forEach(track => {
                        var trackInfo = {};
                        trackInfo.playlistname = playlistname;
                        trackInfo.albumname = track.track.album.name;
                        trackInfo.artist = track.track.artists[0].name;
                        trackInfo.trackname = track.track.name;
                        console.log(trackInfo);
                        myPlaylistData.push(trackInfo);
                    });
                }, function (err) {
                    console.error(err);
                });
        });
        try {
            const csv = json2csv(myPlaylistData, opts);
            console.log(csv);
        } catch (err) {
            console.error(err);
        }
    }, function (err) {
        console.error(err);
    });


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

