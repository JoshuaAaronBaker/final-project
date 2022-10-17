import React from 'react';

export default class Error extends React.Component {

  componentDidMount() {
    window.alert('A connect error has occurred. Please try again.');
  }

  render() {
    return (
  <>
    <div className='error-page'>
        <div>
          <img src="/images/spotify-logo.jpeg" alt="" className="logo" />
        </div>
        <div>
          <a href='#login' className="login-btn">Return to Login</a>
        </div>
      </div>
  </>
    );
  }
}
