import React from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Authorize from './src/Authorize';
import Home from './src/Home';
import parseRoute from './lib/parse-route';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      credentials: null
    };
    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(credentials) {
    this.setState({ credentials, isAuthorizing: false });
    if (this.state.route.path === 'auth') {
      window.location.hash = '';
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    axios.defaults.baseURL = 'https://api.spotify.com/v1';
    // eslint-disable-next-line dot-notation
    axios.defaults.headers['Authorization'] = `Bearer ${window.localStorage.spotifyAccessToken}`;
    axios.defaults.headers['Content-Type'] = 'application/json';
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Welcome credentials={this.state.credentials}/>;
    }
    if (route.path === 'login') {
      return <Login credentials={this.state.credentials}/>;
    }
    if (route.path === 'home') {
      return <Home credentials={this.state.credentials}/>;
    }
  }

  render() {
    if (this.state.isAuthorizing) {
      return <Authorize params={this.state.route.params} onAuthorized={this.setAuth} />;
    }

    return this.renderPage();
  }
}
