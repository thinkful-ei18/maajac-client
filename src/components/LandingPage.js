import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapWrapper from './GoogleMapWrapper';
import ReportForm from './report';
import Dialog from 'material-ui/Dialog';
import { closeDialog } from '../actions/modalActions';
import LoginForm from '../components/Login';
import RegistrationForm from '../components/register';

//Modal is tough to style. It needs styles.

import './css/landingPage.css';

export class LandingPage extends Component {
  handleCloseDialog() {
    console.log('closing dialog...');
    this.props.dispatch(closeDialog());
  }

  render() {
    let modalForm;
    if (this.props.currentTab) {
      if (this.props.currentTab === 'signup') {
        modalForm = <RegistrationForm />;
      } else {
        modalForm = <LoginForm />;
      }
    }

    const reportForm = this.props.currentUser ? <ReportForm /> : ''

    return (
      <div className="landing-page">
        <Dialog
          bodyClassName="modal"
          title="safeR"
          modal={false}
          autoScrollBodyContent={true}
          open={this.props.dialog}
          contentStyle={{ width: 300 }}
          onRequestClose={() => this.handleCloseDialog()}
        >
          {modalForm}
        </Dialog>

        {reportForm}
        <GoogleMapWrapper />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: state.modal.currentTab,
  dialog: state.modal.dialog,
  currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default connect(mapStateToProps)(LandingPage);
