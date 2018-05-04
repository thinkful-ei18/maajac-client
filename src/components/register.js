import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from "./input";
import { required, nonEmpty, matches, length, isTrimmed } from "../utils/validators";
import { register } from '../actions/userActions';

const passwordLength = length({ min: 10, max: 72 })
const matchesPassword = matches("password")

export class RegistrationForm extends React.Component {

	onSubmit(values){
		return this.props.dispatch(register(values));
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

		return (
			<form className="register-form" onSubmit={handleSubmit( values => this.onSubmit(values) )}>
					{this.props.loggedIn ? (<Redirect to='/' />) : ''}

				<div className="form-error" aria-live="polite">
					{errorMessage}
        </div>

				<label htmlFor="username">Username</label>
        <Field component={Input}
					type="text"
					name="username"
					placeholder="sally123"
					validate={[required, nonEmpty, isTrimmed]} />
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
					placeholder="••••••••"
					validate={[required, passwordLength, isTrimmed]} />
				<label htmlFor="passwordConfirm" >Confirm Password</label>
				<Field
					component={Input}
					type="password"
					name="passwordConfirm"
					validate={[required, nonEmpty, matchesPassword]}
					placeholder="••••••••"
				/>
				<button className="form-primary-button" type="submit" disabled={pristine || submitting}>
					Sign Up
				</button>
				<button className="form-login">
					Already have an account? <span className="form-login-text">Log in</span>
				</button>
			</form>
		)
	}
}

export const mapStateToProps = (state, props) => ({
	loggedIn: state.auth.currentUser !== null,
});

export default reduxForm({
	form: "registration",
	onSubmitFail: (errors, dispatch) => dispatch(focus("registration", Object.keys(errors)[0]))
})(connect(mapStateToProps)(RegistrationForm))