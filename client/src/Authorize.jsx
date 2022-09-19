import React from 'react';
import axios from 'axios';

const localStorageKeys = {
  accessToken: 'spotifyAccessToken',
  refreshToken: 'spotifyRefreshToken',
  expireTime: 'tokenExpireTime',
  timestamp: 'tokenTimestamp'
};

export default class Authorize extends React.Component {

  componentDidMount() {

    const accessToken = this.props.params.get('access_token');
    const refreshToken = this.props.params.get('refresh_token');
    const expiresIn = this.props.params.get('expires_in');

    if (!accessToken || !refreshToken || !expiresIn) {
      return this.props.onAuthorized(null);
    }
    if (window.localStorage.spotifyRefreshToken === 'undefined' || ((Date.now() - Number(window.localStorage.tokenTimestamp)) / 1000) < 1000) {
      const data = axios.get(`/refresh_token?refresh_token=${window.localStorage.spotifyRefreshToken}`);

      window.localStorage.setItem(localStorageKeys.accessToken, data.access_token);
      window.localStorage.setItem(localStorageKeys.timestamp, Date.now());
      window.location.reload();
    }

    window.localStorage.setItem(localStorageKeys.accessToken, accessToken);
    window.localStorage.setItem(localStorageKeys.refreshToken, refreshToken);
    window.localStorage.setItem(localStorageKeys.expireTime, expiresIn);
    window.localStorage.setItem(localStorageKeys.timestamp, Date.now());

    this.props.onAuthorized({ accessToken, refreshToken, expiresIn });

  }

  render() {
    return null;
  }

}
