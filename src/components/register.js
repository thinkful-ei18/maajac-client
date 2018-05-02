import React from "react"
import { Field, reduxForm, focus } from "redux-form"
import { localRegister } from "../actions/users"
import Input from "./input"
import { required, nonEmpty, matches, length, isTrimmed } from "../validators"
import { openLogin } from "../actions/control"
import '../css/form.css';

const passwordLength = length({ min: 10, max: 72 })
const matchesPassword = matches("password")

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		console.log(values);
	}

	render() {
		return (
			<form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="firstName">First Name</label>
				<Field
					component={Input}
					type="text"
					name="firstname"
					placeholder="Sally"/>
				<label htmlFor="username" >Username</label>
				<Field component={Input}
					type="text"
					name="username"
					placeholder="sally123"
					validate={[required, nonEmpty, isTrimmed]} />
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
				<button className="form-primary-button" type="submit" disabled={this.props.pristine || this.props.submitting}>
					Sign Up
				</button>
				<button className="form-login">
					Already have an account? <span className="form-login-text">Log in</span>
				</button>
			</form>
		)
	}
}

export default reduxForm({
	form: "registration"
})(RegistrationForm)
