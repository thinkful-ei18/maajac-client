import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { refreshAuthToken } from './actions/userActions';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/register';
import LoginForm from './components/login';
import ReportForm from './components/report';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(refreshAuthToken());
  }
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/report" component={ReportForm} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(App);
