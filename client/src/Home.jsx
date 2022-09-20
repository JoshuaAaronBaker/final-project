import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null
    };
  }

  componentDidMount() {
    axios.get('/me/playlists')
      .then(res => {
        const playlists = res.data;
        this.setState({ isLoading: false, userPlaylists: playlists });
      });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <ul>
        {
          this.state.userPlaylists.items.map(playlist => <li key={playlist.id}><img src={playlist.images[0].url} alt="playlist image" /></li>)
        }
      </ul>
    );
  }
}

axios.defaults.baseURL = 'https://api.spotify.com/v1';
// eslint-disable-next-line dot-notation
axios.defaults.headers['Authorization'] = `Bearer ${window.localStorage.spotifyAccessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';
