/* eslint-disable camelcase */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const querystring = require('query-string');
const axios = require('axios');

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(staticMiddleware);

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';
const scopes = ['user-modify-playback-state', 'user-read-recently-played',
  'user-read-playback-position', 'playlist-read-collaborative', 'app-remote-control', 'user-read-playback-state',
  'user-read-email', 'streaming', 'user-top-read', 'playlist-modify-public', 'user-library-modify',
  'user-follow-read', 'user-read-currently-playing', 'user-library-read', 'playlist-read-private', 'playlist-modify-private'];
const scope = scopes.join('%20');

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&show_dialog=true`);

});

app.get('/callback', (req, res, next) => {
  const code = req.query.code;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    }
  })
    .then(response => {
      if (response.status === 200) {

        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = new URLSearchParams({ access_token, refresh_token, expires_in });

        res.redirect(`/#auth?${queryParams}`);
      }
    })
    .catch(err => next(err));
});

app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
