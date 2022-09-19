import React from 'react';
import Redirect from '../components/redirect';

export default function Welcome(props) {
  if (props.credentials === null) {
    return <Redirect to='login'/>;
  }
  return (
    <div>
      <h1>Welcome</h1>
      <p>Your token is {props.credentials.accessToken}</p>
    </div>
  );
}
