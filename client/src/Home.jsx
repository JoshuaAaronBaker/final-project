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

    Promise.all([
      axios.get('/me/playlists')
        .then(res => res.data),
      axios.get('/browse/featured-playlists')
        .then(res => res.data),
      axios.get('/me/player/recently-played')
        .then(res => res.data),
      axios.get('/me')
        .then(res => res.data),
      axios.get('/me/following?type=artist')
        .then(res => res.data)
    ]).then(([userPlaylists, featuredPlaylists, recentlyPlayed, profile, artists]) => {
      this.setState({ userPlaylists, featuredPlaylists, recentlyPlayed, profile, artists, isLoading: false });
    });
  }

  render() {
    const date = new Date();
    const hours = date.getHours();
    let greeting;

    if (hours >= 0 && hours < 12) {
      greeting = 'Good morning';
    } else if (hours >= 12 && hours < 18) {
      greeting = 'Good afternoon';
    } else if (hours >= 18 && hours < 23) {
      greeting = 'Good evening';
    }

    if (this.state.isLoading) {
      return (
        <div className='loading-background loading-center'>
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      );
    } return (

    <>
      <div className="container gradient hidden">
        <div className="row">
          <div className="col-fourth">
            <Sidebar />
          </div>
          <div className="col-three-fourth">
            <div className="row margin-top-bot-3">
                <h2>{`${greeting}, ${this.state.profile.display_name.split(' ')[0]}`}</h2>
            </div>
            <div className="row wrap margin-top-bot-3">
              <div className="col-full flex-col padding">
                <div className="col-third">
                  {this.state.recentlyPlayed.items.slice(0, 2).map((song, index) => <div key={song.track.id} className='row card'>
                       <a href={`#playlist?playlistId=${song.track.id}`}><div className="col-full flex-col">
                        <div className="col-fourth">
                       <img className='coverartb' src={song.track.album.images[0].url} alt="" />
                        </div>
                        <div className="col-three-fourth">
                        <p>{song.track.name}</p>
                        </div>
                      </div>
                  </a></div>)}
                </div>
                <div className="col-third">
                    {this.state.recentlyPlayed.items.slice(3, 5).map((song, index) => <div key={song.track.id} className='row card'>
                    <a href={`#playlist?playlistId=${song.track.id}`}><div className="col-full flex-col">
                      <div className="col-fourth">
                        <img className='coverartb' src={song.track.album.images[0].url} alt="" />
                      </div>
                      <div className="col-three-fourth">
                        <p>{song.track.name}</p>
                      </div>
                    </div>
                    </a></div>)}
                </div>
                <div className="col-third">
                    {this.state.recentlyPlayed.items.slice(6, 8).map((song, index) => <div key={song.track.id} className='row card'>
                      <a href={`#playlist?playlistId=${song.track.id}`}><div className="col-full flex-col">
                      <div className="col-fourth">
                        <img className='coverartb' src={song.track.album.images[0].url} alt="" />
                      </div>
                      <div className="col-three-fourth">
                        <p>{song.track.name}</p>
                      </div>
                    </div>
                      </a></div>)}
                </div>
              </div>
            </div>
            <div className="row margin-top-bot-3">
              <h3>{`${this.state.profile.display_name}'s`} Playlists</h3>
            </div>
            <div className="row margin-top-bot-3">
              {this.state.userPlaylists.items.slice(0, 5).map((playlist, index) =>
                <a key={playlist.id} href={`#playlist?playlistId=${playlist.id}`}><div className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={playlist.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='pl-name'>{playlist.name}</p>
                  </div>
                </div></a>)}
            </div>
            <div className="row margin-top-bot-3">
              <h3>Featured Playlists</h3>
            </div>
            <div className="row margin-top-bot-3">
              {this.state.featuredPlaylists.playlists.items.slice(0, 5).map(playlist =>
                <a key={playlist.id} href={`#playlist?playlistId=${playlist.id}`}><div key={playlist.id} className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={playlist.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='pl-name'>{playlist.name}</p>
                  </div>
                </div></a>)}
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
        <div className='hide-mobile container gradient overflow'>
          <div>
            <div className="row">
              <h2>{`${greeting}, ${this.state.profile.display_name.split(' ')[0]}`}</h2>
            </div>
            <div className="row slider">
              {this.state.recentlyPlayed.items.map(song =>
                <div key={song.id} className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={song.track.album.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='song-name-home'>{song.track.name}</p>
                  </div>
                </div>)}
            </div>
            <div className="row">
              <h3>{`${this.state.profile.display_name}'s`} Playlists</h3>
            </div>
            <div className="row slider">
              {this.state.userPlaylists.items.map((playlist, index) =>
                <a key={playlist.id} href={`#playlist?playlistId=${playlist.id}`}><div key={playlist.id} className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={playlist.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='pl-name'>{playlist.name}</p>
                  </div>
                </div></a>)}
            </div>
            <div className="row">
              <h3>Featured Playlists</h3>
            </div>
            <div className="row slider">
              {this.state.featuredPlaylists.playlists.items.map((playlist, index) =>
                <a key={playlist.id} href={`#playlist?playlistId=${playlist.id}`}><div key={playlist.id} className='col-third margin10 align-center pointer'>
                  <div className='col-three-fourth'>
                    <img className='coverart' src={playlist.images[0].url} alt="" />
                  </div>
                  <div className='col-fourth text-align-center'>
                    <p className='pl-name'>{playlist.name}</p>
                  </div>
                </div></a>)}
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
            <div className="row position-relative">
              <Navbar />
            </div>
          </div>
      </div>

    </>);
  }
}
