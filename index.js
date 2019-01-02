var spotifyAPI = require("spotify-web-api-node");
var spotify = new spotifyAPI();

// To get an access token or refreh it clone the git repo:
// https://github.com/spotify/web-api-auth-examples and run the node app with your clientId / clientSecret
// ClientID/Secret see https://developer.spotify.com/dashboard/applications
spotify.setAccessToken("BQDeH--yxe7rRiihZxWimNdjtvhfPzeOUfBK_KnNO09SukOcZN0P-Iz9iBW88mXdtKD_fX7dC6eRXbh8ArmZ5XhX1WphMN1yMreMUh3YwxkTxbbL_LiVWAPhBFwOrU8LGGjd9jTSDOKTXZ6f9Bc26hlJqdLWR2A21idz&refresh_token=AQACuQK_UzDk6tGK12wupHrLAXryc_n6PqRM-HrPjL2p-Zq6QUtZPGNEfRW4Kz_Ycj_zc-3Nq15_6arb0_GQwE5jvvWXAFg53CCS0s1jTdVk62oKG-_DoToVRsp6uNin6SdoOw");


spotify.getUserPlaylists("1135449039",{offset:0,limit:50})
    .then(function(data) {
        console.log("User playlists", data.body.items.lenth);
        data.body.items.forEach(element => {

            spotify.getPlaylist(element.id)
                .then(function (playlistData) {
                    playlistData.body.items.forEach(track => {
                        console.log(track);
                    });
                }, function(err) {
                    console.error(err);
                });

            //console.log(element.id);
            //console.log(element.name);
        });
    }, function(err) {
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

