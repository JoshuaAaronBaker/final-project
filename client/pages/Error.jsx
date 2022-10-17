import React from 'react';

export default class Error extends React.Component {

  render() {
    return (
  <>
  {window.alert('A connection error has occurred. Please try again.')}
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
