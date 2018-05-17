import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../utils/validators';
import { register } from '../actions/userActions';
import { openLogin, closeDialog } from '../actions/modalActions';

import './css/modal.css';

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(register(values)).then(() => this.props.dispatch(closeDialog()));
	}

	handleLoginClick() {
		this.props.dispatch(openLogin());
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		let errorMessage;
		if (this.props.error) {
			errorMessage = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}
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

		return (
			<form className="modal-form" onSubmit={handleSubmit(values => this.onSubmit(values))}>
				<div className="form-error" aria-live="polite">
					{errorMessage}
				</div>

				<label htmlFor="username">Username</label>
				<Field
					component={Input}
					type="text"
					name="username"
					id="username"
					placeholder="sally123"
					validate={[required, nonEmpty, isTrimmed]}
				/>
				{/* <label htmlFor="username" >First Name</label>
        <Field component={Input}
					type="text"
					name="firstName"
					placeholder="Sally"
					validate={[required, nonEmpty, isTrimmed]} />
				<label htmlFor="username" >Last Name (Not Required)</label>
        <Field component={Input}
					type="text"
					name="lastName"
					placeholder="Student"
					validate={[required, nonEmpty, isTrimmed]} /> */}
				<label htmlFor="password">Password</label>
				<Field
					component={Input}
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					validate={[required, passwordLength, isTrimmed]}
				/>
				<label htmlFor="passwordConfirm">Confirm Password</label>
				<Field
					component={Input}
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					validate={[required, nonEmpty, matchesPassword]}
					placeholder="••••••••"
				/>
				<div className="button-group">
					<button className="form-primary-button form-button" type="submit" disabled={pristine || submitting}>
						Sign Up
					</button>
					<p className="login-shortcut" onClick={() => this.handleLoginClick()}>
						Already have an account? <span className="form-login-text">Log in</span>
					</p>
				</div>
			</form>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	loggedIn: state.auth.currentUser !== null,
});

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0])),
})(connect(mapStateToProps)(RegistrationForm));
