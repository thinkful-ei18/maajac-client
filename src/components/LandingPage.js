import React, { Component } from 'react'

import GoogleMapWrapper from './GoogleMapWrapper';
import ReportForm from './report';

import './css/landingPage.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <ReportForm />
        <GoogleMapWrapper />
      </div>
    );
  }
}