import React from 'react';
import Redirect from '../components/redirect';
import axios from 'axios';
import Home from '../src/Home';

export default function Welcome(props) {
  if (props.credentials === null) {
    return <Redirect to='login'/>;
  }
  axios.get('/me/playlists')
  // // eslint-disable-next-line no-console
  //   .then(res => console.log(res))
    .catch(err => console.error(err));
  return (
    <Home />
  );
}
axios.defaults.baseURL = 'https://api.spotify.com/v1';
// eslint-disable-next-line dot-notation
axios.defaults.headers['Authorization'] = `Bearer ${window.localStorage.spotifyAccessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';
