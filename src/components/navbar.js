import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// styles
import './css/navbar.css'

export class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <span className='home'><NavLink to='/'>GuardDog</NavLink></span>
        <NavLink to='/submit'>Submit new report</NavLink>
      </nav>
    )
  }
}

export default Navbar;