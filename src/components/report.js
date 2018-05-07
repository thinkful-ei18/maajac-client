import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, SubmissionError } from 'redux-form';
import { newMarker } from '../actions/markerActions';
import './css/report.css';
import Input from './input';
import { required, nonEmpty, length, checkDate } from '../utils/validators';

const descriptionLength = length({ min: 10, max: 120 });

class reportForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, reset, dispatch, error } = this.props;

    let errorMessage;
    if (error) {
      errorMessage = (
        <div className="form-error" aria-live="polite">
          {error}
        </div>
      );
    }

    return (
      <div className="report">
        <div className="form-error" aria-live="polite">
            {errorMessage}
          </div>
        <form
          name={'report'}
          id="incident-report"
          onSubmit={handleSubmit(values => {
<<<<<<< HEAD
            if (this.props.location === null) {
              console.log('No location!!!!');
              const err = new Error('Please choose a location');
              err.status = 422;
              throw new SubmissionError(err);
            } else {
              values.location = this.props.location;
              dispatch(newMarker(values));
              dispatch(reset('report'));
            }
          })}>
=======
            values.location = this.props.location;
            dispatch(newMarker(values));
            dispatch(reset('report'));
          })}
        >
>>>>>>> 1b3237417d390f130fe3cee4485cdef981db3945
          <label htmlFor="incident-type">Incident Type</label>
          <Field
            component="select"
            id="type"
            name="incidentType"
            required="required"
          >
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
            validate={[required, nonEmpty, descriptionLength]}
          />
          <button className="report-button" type="submit" onClick={reset}>
            Clear
          </button>
          <button
            className="report-button"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.report.userLocation
});

reportForm = connect(mapStateToProps)(reportForm);

export default reduxForm({
  form: 'report'
})(reportForm);
