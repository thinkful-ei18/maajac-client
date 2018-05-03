import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Menu from '../components/dropdownMenu';

// styles
import './css/navbar.css'

export class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <span className='home'><NavLink to='/'>App Title</NavLink></span>


          <button onClick={this.showMenu}>
            Show menu
        </button>

          {
            this.state.showMenu
              ? (
                <div className="dropdown-menu">
                  <NavLink to='/submit'>Submit new report</NavLink>
                  <button> Dummy link 1 </button>
                  <button> Dummy link 2 </button>
                </div>
              )
              : (
                null
              )
          }
        </nav>
      </div>
    );
  }
}


export default Navbar;