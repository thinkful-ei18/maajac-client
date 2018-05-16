import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from '../components/Login';
import RegistrationForm from '../components/register';
import phoneImage from '../images/phone.jpg';
import beardGuy from '../images/beardguy.jpg';
import groupImage from '../images/group.svg';
import anonymousUserImage from '../images/user-15.svg';
import writingImage from '../images/user-10.svg';
import { closeDialog } from '../actions/modalActions';

import './css/rootpage.css';

class RootPage extends Component {
	handleCloseDialog() {
		this.props.dispatch(closeDialog());
	}
	componentWillMount() {
		document.body.style.backgroundColor = 'white';
	}

	render() {
		if (this.props.currentUser) {
			return <Redirect to="/map" />;
		}

		let modalForm;
		if (this.props.currentTab) {
			if (this.props.currentTab === 'signup') {
				modalForm = <RegistrationForm />;
			} else {
				modalForm = <LoginForm />;
			}
		}

		return (
			<div className="rootpage">
				<Dialog
					bodyClassName="modal"
					title="safeR"
					modal={false}
					autoScrollBodyContent={true}
					contentStyle={{ width: 300 }}
					open={this.props.dialog}
					onRequestClose={() => this.handleCloseDialog()}
				>
					{modalForm}
				</Dialog>
				<header className="header">
					<h1>
						safeR makes it easy to find out about crimes and incidents in your community.
					</h1>
				</header>
				<main>
					<div className="feature-container">
						<div className="feature">
							<img src={writingImage} alt="Icon of user with a pen" />
							<h2>No registration required</h2>
							<p>View incident locations and descriptions without signing up. Always know what's going on in your neighborhood.</p>
						</div>
						<div className="feature">
							<img src={groupImage} alt="Icon of 3 users" />
							<h2>Community driven</h2>
							<p>Create an account to report incidents in your community and create a safer neighborhood for everyone.</p>
						</div>
						<div className="feature">
							<img src={anonymousUserImage} alt="Icon of user crossed out" />
							<h2>Anonymous and easy to use</h2>
							<p>We value the privacy of our users. Report incidents in your community easily with your private profile.</p>
						</div>
					</div>
					<div className='start-link'>
						<Link to="/map">
							<p>Get started &#8594;</p>
						</Link>
					</div>
				</main>
				<footer className="footer">
						<h3>Team MAJAAC</h3>
					<ul className="footer-credits">
						<li>
							<a href="http://www.alishaantoinette.com/" target="_blank" rel="noopener noreferrer">
								Alisha Evans
							</a>
						</li>
						<li>
							<a href="http://www.christinamakes.com/" target="_blank" rel="noopener noreferrer">
								Christina Moore
							</a>
						</li>
						<li>
							<a href="https://aliahmad-code.github.io/" target="_blank" rel="noopener noreferrer">
								Ali Ahmad
							</a>
						</li>
						<li>
							<a href="http://Muaath-Alaraj.com" target="_blank" rel="noopener noreferrer">
								Muaath Alaraj
							</a>
						</li>
						<li>
							<a href="https://github.com/adriantoddross" target="_blank" rel="noopener noreferrer">
								Adrian Ross
							</a>
						</li>
					</ul>
						<h3>View on GitHub</h3>
					<div className="github-container">
						<a
							className="github-link"
							href="https://github.com/thinkful-ei18/maajac-client"
							target="_blank"
							rel="noopener noreferrer"
						>
							Client Repo
						</a>
						<a
							className="github-link"
							href="https://github.com/thinkful-ei18/majaac-server"
							target="_blank"
							rel="noopener noreferrer"
						>
							Server Repo
						</a>
					</div>
				</footer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentTab: state.modal.currentTab,
	dialog: state.modal.dialog,
	currentUser: state.auth.currentUser ? state.auth.currentUser : 0,
});

export default connect(mapStateToProps)(RootPage);
