import React, { Component } from 'react';
import GoogleMapWrapper from './GoogleMapWrapper';
import ReportForm from './report';

export default class MobileReport extends Component {
  render() {
    return(
      <section >
        <GoogleMapWrapper />
        <ReportForm />
      </section>
    )
  }
}