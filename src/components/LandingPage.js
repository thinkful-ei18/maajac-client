import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import { Redirect } from 'react-router-dom';

import GoogleMapWrapper from './GoogleMapWrapper';
import ReportForm from './report';
import { closeDialog } from '../actions/modalActions';
import LoginForm from '../components/Login';
import RegistrationForm from '../components/register';

import './css/landingPage.css';

export class LandingPage extends Component {
	componentWillMount() {
		document.body.style.backgroundColor = 'white';
	}
	handleCloseDialog() {
		this.props.dispatch(closeDialog());
	}

	render() {
		if (!this.props.currentUser && this.props.match.path === '/report') {
			return <Redirect to="/map" />;
		} else if (this.props.currentUser && this.props.match.path === '/map') {
			function getOS() {
				let userAgent = window.navigator.userAgent,
					platform = window.navigator.platform,
					macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
					windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
					iosPlatforms = ['iPhone', 'iPad', 'iPod'],
					os = null;

				if (macosPlatforms.indexOf(platform) !== -1) {
					os = 'Mac OS';
				} else if (iosPlatforms.indexOf(platform) !== -1) {
					os = 'iOS';
				} else if (windowsPlatforms.indexOf(platform) !== -1) {
					os = 'Windows';
				} else if (/Android/.test(userAgent)) {
					os = 'Android';
				} else if (!os && /Linux/.test(platform)) {
					os = 'Linux';
				}

				return os;
			}
			const os = getOS();
			const isMobile = window.innerWidth <= 1023;
			if (this.props.currentUser) {
				if (os === ('iOS' || 'Android')) {
					if (isMobile) {
						return <Redirect to="/report" />;
					} else {
						return <Redirect to="/map" />;
					}
				} else {
					return <Redirect to="/map" />;
				}
			}
		}

		let modalForm;
		if (this.props.currentTab) {
			if (this.props.currentTab === 'signup') {
				modalForm = <RegistrationForm />;
			} else {
				modalForm = <LoginForm />;
			}
		}

		const reportForm = this.props.currentUser ? <ReportForm path={this.props.match.path} /> : '';

		return (
			<div className="landing-page">
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

				{reportForm}

				<GoogleMapWrapper path={this.props.match.path} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentTab: state.modal.currentTab,
	dialog: state.modal.dialog,
	currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default connect(mapStateToProps)(LandingPage);
