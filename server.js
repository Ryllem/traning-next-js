const express = require("express");
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config()
// var cors = require("cors");

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
]

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

console.log("DEMARRAGE DU SERVEUR");

const app = express();

let token = null; // Token pour utuliser Spotify

app.get('/', (req, res) => {
  console.log(`\x1B[32m LANCEMENT ROUTE LOGIN\x1B[39m`)
  const urlApi = spotifyApi.createAuthorizeURL(scopes)
  console.log('urlApi:', urlApi)
  res.redirect(urlApi)
})

app.get("/callback", (req, res) => {
  console.log("LANCEMENT ROUTE CALLBACK");
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];
      console.log(access_token)
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      let token = access_token
      console.log("access_token:", access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      token = access_token;
      res.send({status: "ok", token})
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(8888, () =>
  console.log(
    `\u001b[1;36mHTTP Server OK, tu peux maintenant te connecter ici: http://localhost:8888\x1B[39m`
  )
);
