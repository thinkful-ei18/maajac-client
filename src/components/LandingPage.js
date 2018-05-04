import React, { Component } from 'react'
import { connect } from "react-redux"

import GoogleMapWrapper from './GoogleMapWrapper';
import ReportForm from './report';
import Dialog from 'material-ui/Dialog';
import { closeDialog } from '../actions/modalActions';

import './css/landingPage.css'

export class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">

        <ReportForm />
        <GoogleMapWrapper />
      </div>
    );
  }
}

const mapStateToProps = state => ({
	currentTab: state.modal.currentTab,
	dialog: state.modal.dialog,
	currentUser: state.auth.currentUser ? state.auth.currentUser : ''
})

export default connect(mapStateToProps)(LandingPage);