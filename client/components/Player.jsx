import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import './player.css';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <div className='player'>
      <SpotifyPlayer
        token={window.localStorage.spotifyAccessToken}
        showSaveIcon
        callback={state => !state.isPlaying && setPlay(false)}
        play={play}
        isMagnified={true}
        uris={trackUri || []}
        styles={{
          activeColor: '#fff',
          bgColor: '#000000',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          sliderHandleColor: 'fff',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          height: '55px'
        }}
      />
  </div>
  );
};

export default Player;
