import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset} from 'redux-form';
import { newMarker } from '../actions/markerActions';
import './css/report.css';
import Input from './input';
import { required, nonEmpty, length, checkDate } from '../utils/validators';

const descriptionLength = length({ min: 10, max: 120 });

class reportForm extends Component {

  constructor(props) {
    super(props);

    this.state = {locationError: ''}
  }

  handleLocationError(error) {
    this.setState({locationError: error});
  }


  render() {
    const { handleSubmit, pristine, submitting, reset, dispatch } = this.props;

    return (
      <div className="report">
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
          })}>
          <label htmlFor="incident-type">Incident Type</label>
          <Field
            component="select"
            id="type"
            name="incidentType"
<<<<<<< HEAD
            required="required">
=======
            required="required"
            >
>>>>>>> 5b6a96b1a8b05d118f7baad4808f91519e2c3730
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
          <p>{this.state.locationError}</p>
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
