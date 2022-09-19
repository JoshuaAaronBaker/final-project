import React from 'react';
import Redirect from '../components/redirect';
import './login.css';

export default class Login extends React.Component {

  render() {
    if (this.props.credentials !== null) {
      return <Redirect to='' />;
    }
    return (
      <div className="login-page">
        <div>
          <img src="/images/spotify-logo.jpeg" alt="" className="logo" />
        </div>
        <div>
          <a href='/login' className="login-btn">LOGIN WITH SPOTIFY</a>
        </div>
      </div>);
  }
}
