import React, { Component } from 'react';
import Input from './input';
import {Field, reduxForm} from 'redux-form';
import {required, nonEmpty, minLength120} from '../utils/validators';
import './css/report.css';
// import {connect} from 'react-redux';

class reportForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;


    return(
      <div>
        <form id="incident-report" onSubmit={handleSubmit(values => {console.log(values)}
        )}>
          <label
            htmlFor="incident-type">Incident Type
          </label>
          <Field
            component="select"
            id="type"
            name="type"
            required="required"
          >
            <option value=""></option>
            <option value="crime">Crime</option>
            <option value="accident">Traffic Accident</option>
            <option value="other">Other</option>
          </Field>
          <Field
            component={Input}
            id="date"
            label="Date"
            type="date"
            name="date"
            validate={[required, nonEmpty]}
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
            validate={[required, nonEmpty, minLength120]}
          />
          <Field
            component={Input}
            id="suspect"
            label="Description of Suspect"
            type="text"
            name="suspect"
            validate={[required, nonEmpty, minLength120]}
          />
          <button
            type="submit"
            onClick={reset}>
            Clear Values
          </button>
          <button
            type="submit"
            disabled={pristine || submitting}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

reportForm = reduxForm({
  form: "report"
})(reportForm);

export default reportForm;