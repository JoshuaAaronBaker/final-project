import React from 'react';
import axios from 'axios';
import './home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userPlaylists: {},
      featuredPlaylists: {},
      recentlyPlayed: {},
      profile: {}
    };
  }

  componentDidMount() {
    axios.get('/me/playlists')
      .then(res => {
        const playlists = res.data;
        this.setState({ isLoading: false, userPlaylists: playlists });
      });

    axios.get('/browse/featured-playlists')
      .then(res => {
        const featuredPlaylists = res.data;
        this.setState({ featuredPlaylists });
      });

    axios.get('/me/player/recently-played')
      .then(res => {
        const recentlyPlayed = res.data;
        this.setState({ recentlyPlayed });
      });

    axios.get('/me')
      .then(res => {
        const profile = res.data;
        this.setState({ profile });
      });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <div className="container overflow backgrond">
        <div className="row">
          <h2>Good Afternoon</h2>
        </div>
        <div className="row slider">
          {this.state.recentlyPlayed.items.map(song =>
            <div key={song.id} className='col-third margin10 align-center'>
              <div className='col-three-fourth'>
                <img className='coverart' src={song.track.album.images[0].url} alt="" />
              </div>
              <div className='col-fourth text-align-center'>
                <p>{song.track.name}</p>
              </div>
            </div>)}
        </div>
        <div className="row">
          <h3>{`${this.state.profile.display_name}'s`} Playlists</h3>
        </div>
        <div className="row slider">
            {this.state.userPlaylists.items.map(playlist =>
              <div key={playlist.id} className='col-third margin10 align-center'>
                <div className='col-three-fourth'>
                  <img className='coverart' src={playlist.images[0].url} alt="" />
                </div>
                <div className='col-fourth text-align-center'>
                  <p>{playlist.name}</p>
                </div>
              </div>)}
        </div>
        <div className="row">
          <h3>Featured Playlists</h3>
        </div>
        <div className="row slider">
          {this.state.featuredPlaylists.playlists.items.map(playlist =>
            <div key={playlist.id} className='col-third margin10 align-center'>
              <div className='col-three-fourth'>
                <img className='coverart' src={playlist.images[0].url} alt="" />
              </div>
              <div className='col-fourth text-align-center'>
                <p>{playlist.name}</p>
              </div>
            </div>)}
        </div>
        {/* <div className="row">
          <h3>Featured Playlists</h3>
        </div>
        <div className="row slider">
          {this.state.featuredPlaylists.playlists.items.map(playlist =>
            <div key={playlist.id} className='col-third margin10 align-center'>
              <div className='col-three-fourth'>
                <img className='coverart' src={playlist.images[0].url} alt="" />
              </div>
              <div className='col-fourth text-align-center'>
                <p>{playlist.name}</p>
              </div>
            </div>)}
        </div> */}
      </div>
    );
  }
}

axios.defaults.baseURL = 'https://api.spotify.com/v1';
// eslint-disable-next-line dot-notation
axios.defaults.headers['Authorization'] = `Bearer ${window.localStorage.spotifyAccessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';
