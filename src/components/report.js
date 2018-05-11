import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './SearchBox';
import Filter from './Filter';
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
	componentWillMount() {
		document.body.style.backgroundColor = '#3b4141';
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
				<ul className="tabs">
					<li>
						<input checked="defaultChecked" type="radio" name="tabs" id="tab-1" />
						<label htmlFor="tab-1">Report</label>
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
								<label className="reg-label" htmlFor="incidentType">
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
						<label htmlFor="tab-2">Search</label>
						<div className="tab-content">
							<Filter />
							<Search />
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
