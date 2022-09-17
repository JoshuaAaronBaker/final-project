import React from 'react';
import Redirect from '../components/redirect';

export default class Login extends React.Component {

  render() {
    if (this.props.credentials !== null) {
      return <Redirect to='' />;
    }
    return (
      <div className="login-page">
        <div>
          <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" className="logo" />
        </div>
        <div>
          <a href='/login' className="login-btn">LOGIN WITH SPOTIFY</a>
        </div>
      </div>);
  }
}
