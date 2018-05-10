import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { clearAuth } from '../actions/userActions';
import Filter from './Filter';
import Search from './SearchBox';
import { clearUserCredentials, clearAuthToken } from '../local-storage';
import { openSignUp, openLogin, openDialog, closeDialog } from '../actions/modalActions';
// import Menu from '../components/dropdownMenu';

// styles

import './css/navbar.css';

export class Navbar extends Component {
	constructor() {
		super();

		this.state = {
			showMenu: false,
		};

		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.logout = this.logout.bind(this);
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

	logout() {
		clearAuthToken();
		clearUserCredentials();
		this.props.dispatch(clearAuth());
		this.props.dispatch(closeDialog());
	}

	signUp() {
		// todo: signup data flow
		this.props.dispatch(openDialog());
		this.props.dispatch(openSignUp());
	}
	logIn(data) {
		//todo: log in data flow
		this.props.dispatch(openDialog());
		this.props.dispatch(openLogin());
	}

	render() {
		let loggedInNavbar;

		if (this.props.loggedIn) {
			loggedInNavbar = (
				<button className="report-button-large" onClick={this.showMenu}>
					Welcome, {this.props.currentUser.username} <i className="arrow down" />
				</button>
			);
		} else {
			loggedInNavbar = (
				<div>
					<button className="report-button" onClick={() => this.signUp()}>
						Sign Up
					</button>
					<button className="report-button" onClick={() => this.logIn()}>
						Log In
					</button>
				</div>
			);
		}
		return (
			<div>
				<nav className="navbar">
					<span className="home">
						<NavLink className="logo" to="/">
							safeR
						</NavLink>
					</span>
					<Search /> <Filter />
					{loggedInNavbar}
					{this.state.showMenu ? (
						<div className="dropdown-menu">
							<Link to="/">Map</Link>
							<Link to="/dashboard">Dashboard</Link>
							<Link to="/report" className="mobile-only-navbar">
								Report
							</Link>
							<Link to="/about">About</Link>
							<button className="navbar-link" onClick={this.logout}>
								{' '}
								Logout{' '}
							</button>
						</div>
					) : null}
				</nav>
			</div>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	loggedIn: state.auth.currentUser !== null,
	currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default connect(mapStateToProps)(Navbar);
