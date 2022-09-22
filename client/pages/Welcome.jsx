import React from 'react';
import Redirect from '../components/redirect';
import Home from '../src/Home';

export default function Welcome(props) {
  if (props.credentials === null) {
    return <Redirect to='login'/>;
  }
  return (
    <Home />
  );
}
