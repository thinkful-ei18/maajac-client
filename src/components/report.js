import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import Search from './SearchBox';
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
		if (this.props.path === '/') {
			style = 'report';
		} else if (this.props.path === '/report') {
			style = 'mobile-only';
		}

		return (
			<div className={style}>
				<ul className="tabs">
					<li>
						<input checked="checked" type="radio" name="tabs" id="tab-1" />
						<label for="tab-1">Form</label>
						<div className="tab-content">
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
									<option value="crime">Crime</option>
									<option value="theft">Theft</option>
									<option value="roadconstruction">Road Construction</option>
									<option value="accident">Traffic Accident</option>
									<option value="other">Other</option>
								</Field>
								<label className="reg-label">Date</label>
								<Field
									component={Input}
									id="date"
									type="date"
									name="date"
									validate={[required, nonEmpty, checkDate]}
								/>
								<label className="reg-label">Time</label>
								<Field
									component={Input}
									id="time"
									type="time"
									name="time"
									validate={[required, nonEmpty]}
								/>
								<label className="reg-label">Description of Incident</label>
								<Field
									component={Input}
									id="description"
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
					</li>
					<li>
						<input type="radio" name="tabs" id="tab-2" />
						<label for="tab-2">Tools</label>
						<div className="tab-content">
							<Search />
							<Filter />
						</div>
					</li>
				</ul>
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
