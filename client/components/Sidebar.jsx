import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

export default class Sidebar extends React.Component {

  render() {
    return (
      <div className="row sidebar">
        <div className="col-full">
          <div className="row">
            <img className="sidebar-logo" src="/images/spotify-logo.jpeg" alt="" />
          </div>
          <div className="row sidebar-padding centerting">
            <a href="#home" id='home'><FontAwesomeIcon className='icon icon-padding' icon={faHome} /><span>Home</span></a>
          </div>
          <div className="row sidebar-padding centerting">
            <a href="#search" id='search'><FontAwesomeIcon className='icon icon-padding' icon="fa-solid fa-magnifying-glass" /><span>Search</span></a>
          </div>
        </div>
      </div>
    );
  }
}
