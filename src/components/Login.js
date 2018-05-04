import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import Input from './input';
import { Redirect } from 'react-router-dom';
import { required, nonEmpty } from '../utils/validators';
import { login } from '../actions/userActions';

export class LoginForm extends Component {

	onLogin(values) {
		return this.props.dispatch(login(values.username, values.password));
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
			<div className='login'>
				{this.props.loggedIn ? (<Redirect to='/' />) : ''}
				<form
					className="login-form"
					onSubmit={handleSubmit( values => this.onLogin(values) )}
				>
					<div className="form-error" aria-live="polite">
          	{errorMessage}
        	</div>

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
			</div>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	loggedIn: state.auth.currentUser !== null,
});

export default reduxForm({
	form: 'login',
})(connect(mapStateToProps)((LoginForm)));
