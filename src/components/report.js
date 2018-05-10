import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newMarker } from '../actions/markerActions';
import './css/report.css';
import Input from './input';
import { required, nonEmpty, length, checkDate } from '../utils/validators';

const descriptionLength = length({ min: 10, max: 120 });

class reportForm extends Component {
	constructor(props) {
		super(props);

		this.state = { locationError: '' };
	}

	handleLocationError(error) {
		this.setState({ locationError: error });
	}

	render() {
		const { handleSubmit, pristine, submitting, reset, dispatch } = this.props;

		let style;
		if (this.props.path === '/map') {
			style = 'report';
		} else if (this.props.path === '/report') {
			style = 'mobile-only';
		}

		return (
			<div className={style}>
				<form
					name={'report'}
					id="incident-report"
					onSubmit={handleSubmit(values => {
						if (this.props.location === null) {
							this.handleLocationError('Please choose a location by clicking on the map');
							return;
						}

						values.location = this.props.location;
						dispatch(newMarker(values));
						dispatch(reset('report'));
					})}
				>
					<label className="reg-label" htmlFor="incident-type">
						Incident Type
					</label>
					<Field component="select" id="type" name="incidentType" required="required">
						<option value="" />
						<option value="Crime">Crime</option>
						<option value="Theft">Theft</option>
						<option value="Road-Construction">Road Construction</option>
						<option value="Accident">Traffic Accident</option>
						<option value="Other">Other</option>
					</Field>
					<Field
						component={Input}
						id="date"
						label="Date"
						type="date"
						name="date"
						validate={[required, nonEmpty, checkDate]}
					/>
					<Field
						component={Input}
						id="time"
						label="Time"
						type="time"
						name="time"
						validate={[required, nonEmpty]}
					/>
					<Field
						component={Input}
						id="description"
						label="Description of Incident"
						type="text"
						name="description"
						validate={[required, nonEmpty, descriptionLength]}
					/>
					<p>{this.state.locationError}</p>
					<button className="report-button" type="submit" onClick={reset}>
						Clear
					</button>
					<button className="report-button" type="submit" disabled={pristine || submitting}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	location: state.report.userLocation,
});

reportForm = connect(mapStateToProps)(reportForm);

export default reduxForm({
	form: 'report',
})(reportForm);

/*
Resources:
 - https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
*/
