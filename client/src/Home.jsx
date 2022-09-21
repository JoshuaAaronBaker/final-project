import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userPlaylists: {},
      featuredPlaylists: {},
      recentlyPlayed: {},
      profile: {},
      artists: {}
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

    axios.get('/me/following?type=artist')
      .then(res => {
        const artists = res.data;
        this.setState({ artists });
      });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    } return (
    <>
      <div className="container gradient hidden">
        <div className="row">
          <div className="col-fourth">
            <Sidebar />
          </div>
          <div className="col-three-fourth">
            <div className="row margin-top-bot-3">
              <h2>Good Afternoon</h2>
            </div>
            <div className="row wrap margin-top-bot-3">
              <div className="col-full flex-col padding">
                <div className="col-third">
                  {this.state.recentlyPlayed.items.slice(0, 2).map(song => <div key={song.id} className='row card'>
                      <div className="col-full flex-col">
                        <div className="col-fourth">
                        <img className='coverartb' src={song.track.album.images[0].url} alt="" />
                        </div>
                        <div className="col-three-fourth">
                        <p>{song.track.name}</p>
                        </div>
                      </div>
                  </div>)}
                </div>
                <div className="col-third">
                  {this.state.recentlyPlayed.items.slice(3, 5).map(song => <div key={song.id} className='row card'>
                    <div className="col-full flex-col">
                      <div className="col-fourth">
                        <img className='coverartb' src={song.track.album.images[0].url} alt="" />
                      </div>
                      <div className="col-three-fourth">
                        <p>{song.track.name}</p>
                      </div>
                    </div>
                  </div>)}
                </div>
                <div className="col-third">
                  {this.state.recentlyPlayed.items.slice(6, 8).map(song => <div key={song.id} className='row card'>
                    <div className="col-full flex-col">
                      <div className="col-fourth">
                        <img className='coverartb' src={song.track.album.images[0].url} alt="" />
                      </div>
                      <div className="col-three-fourth">
                        <p>{song.track.name}</p>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
            <div className="row margin-top-bot-3">
              <h3>{`${this.state.profile.display_name}'s`} Playlists</h3>
            </div>
            <div className="row margin-top-bot-3">
              {this.state.userPlaylists.items.slice(0, 5).map(playlist =>
                <div key={playlist.id} className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={playlist.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='pl-name'>{playlist.name}</p>
                  </div>
                </div>)}
            </div>
            <div className="row margin-top-bot-3">
              <h3>Featured Playlists</h3>
            </div>
            <div className="row margin-top-bot-3">
              {this.state.featuredPlaylists.playlists.items.slice(0, 5).map(playlist =>
                <div key={playlist.id} className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={playlist.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='pl-name'>{playlist.name}</p>
                  </div>
                </div>)}
            </div>
            <div className="row margin-top-bot-3">
          <h3>Your Followed Artists</h3>
        </div>
            <div className="row margin-top-bot-3">
          {this.state.artists.artists.items.slice(0, 9).map(artist =>
            <div key={artist.id} className='col-third margin10 align-center'>
              <div className='col-three-fourth'>
                <img className='artists' src={artist.images[0].url} alt="" />
              </div>
              <div className='col-fourth text-align-center'>
                <p>{artist.name}</p>
              </div>
            </div>)}
        </div>
          </div>
        </div>
      </div>
      <div className="container overflow backgrond">
        <div className="row position-relative">
            <Navbar/>
        </div>
        <div className="row">
          <h2>Good Afternoon</h2>
        </div>
        <div className="row slider">
          {this.state.recentlyPlayed.items.map(song =>
            <div key={song.id} className='col-third margin10 align-center pointer'>
              <div className='col-three-fourth'>
                <img className='coverart' src={song.track.album.images[0].url} alt="" />
              </div>
              <div className='col-fourth text-align-center'>
                <p className='song-name'>{song.track.name}</p>
              </div>
            </div>)}
        </div>
    <div className="row">
      <h3>{`${this.state.profile.display_name}'s`} Playlists</h3>
    </div>
    <div className="row slider">
        {this.state.userPlaylists.items.map(playlist =>
          <div key={playlist.id} className='col-third margin10 align-center pointer'>
            <div className='col-three-fourth'>
              <img className='coverart' src={playlist.images[0].url} alt="" />
            </div>
            <div className='col-fourth text-align-center'>
              <p className='pl-name'>{playlist.name}</p>
            </div>
          </div>)}
    </div>
    <div className="row">
      <h3>Featured Playlists</h3>
    </div>
    <div className="row slider">
      {this.state.featuredPlaylists.playlists.items.map(playlist =>
        <div key={playlist.id} className='col-third margin10 align-center pointer'>
          <div className='col-three-fourth'>
            <img className='coverart' src={playlist.images[0].url} alt="" />
          </div>
          <div className='col-fourth text-align-center'>
            <p className='pl-name'>{playlist.name}</p>
          </div>
        </div>)}
    </div>
        <div className="row">
          <h3>Your Followed Artists</h3>
        </div>
        <div className="row slider">
          {this.state.artists.artists.items.map(artist =>
            <div key={artist.id} className='col-third margin10 align-center'>
              <div className='col-three-fourth'>
                <img className='artists' src={artist.images[0].url} alt="" />
              </div>
              <div className='col-fourth text-align-center'>
                <p>{artist.name}</p>
              </div>
            </div>)}
        </div>
      </div>
    </>);
  }
}

axios.defaults.baseURL = 'https://api.spotify.com/v1';
// eslint-disable-next-line dot-notation
axios.defaults.headers['Authorization'] = `Bearer ${window.localStorage.spotifyAccessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';
