import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
  <SpotifyPlayer
  className='player'
    token={window.localStorage.spotifyAccessToken}
    showSaveIcon
    callback={state => !state.isPlaying && setPlay(false)}
    play={play}
    isMagnified= {true}
    uris={trackUri || []}
    styles={{
      activeColor: '#fff',
      bgColor: '#000000',
      color: '#fff',
      loaderColor: '#fff',
      sliderColor: '#1cb954',
      trackArtistColor: '#ccc',
      trackNameColor: '#fff',
      height: '55px'
    }}
    />
  );
};

export default Player;
