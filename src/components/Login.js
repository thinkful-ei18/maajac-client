import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Input from './input';
import { required, nonEmpty } from '../utils/validators';
import { login } from '../actions/userActions';

export class LoginForm extends Component {
	onLogin(values) {
		return this.props.dispatch(login(values.username, values.password));
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		let error;
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<form
				className="login-form"
				onSubmit={handleSubmit(values => {
					this.onLogin(values);
				})}
			>
				{error}

				<label htmlFor="username">Username</label>
				<Field
					component={Input}
					placeholder="sally123"
					type="text"
					name="username"
					id="username"
					validate={[required, nonEmpty]}
				/>

				<label htmlFor="password">Password</label>
				<Field
					component={Input}
					placeholder="••••••••"
					type="password"
					name="password"
					id="password"
					validate={[required, nonEmpty]}
				/>

				<button
					className="form-primary-button"
					disabled={pristine || submitting}
				>
					Log in
        </button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'login',
})(LoginForm);
