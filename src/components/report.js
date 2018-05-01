import React, { Component } from 'react';
import Input from './input';
// import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

class reportForm extends Component {
  render() {
    // const { handleSubmit } = this.props;

    return(
      <div>
        <form id="incident-report">
          <label
            htmlFor="incident-type">Incident Type
          </label>
          <Field
            component="select"
            id="type"
            label="Incident Type"
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
            required="required"
          />
          <Field
            component={Input}
            id="time"
            label="Time"
            type="time"
            name="time"
          />
          <Field
            component={Input}
            id="description"
            label="Description of Incident"
            type="text"
            name="description"
          />
          <Field
            component={Input}
            id="suspect"
            label="Description of Suspect"
            type="text"
            name="suspect"
          />
          <button
            type="submit">
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