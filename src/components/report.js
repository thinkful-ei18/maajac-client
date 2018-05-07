import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newMarker } from '../actions/markerActions';
import './css/report.css';
import Input from './input';
import {
  required,
  nonEmpty,
  minLength120,
  checkDate,
} from '../utils/validators';

class reportForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;

    return (
      <div className="report">
        <form
          id="incident-report"
          onSubmit={handleSubmit(values => {
            values.location = this.props.location;
            this.props.dispatch(newMarker(values));
          })}>
          <label htmlFor="incident-type">Incident Type</label>
          <Field
            component="select"
            id="type"
            name="incidentType"
            required="required">
            <option value="" />
            <option value="crime">Crime</option>
            <option value="theft">Theft</option>
            <option value="roadconstruction">Road Construction</option>
            <option value="accident">Traffic Accident</option>
            <option value="other">Other</option>
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
            validate={[required, nonEmpty]}
          />
          {/* <Field
            component={Input}
            id="suspect"
            label="Description of Suspect"
            type="text"
            name="suspect"
            validate={[required, nonEmpty, minLength120]}
          /> */}
          <button className="report-button" type="submit" onClick={reset}>
            Clear
          </button>
          <button
            className="report-button"
            type="submit"
            disabled={pristine || submitting}>
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
