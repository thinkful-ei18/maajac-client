import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.css';
import ReportForm from './components/report';
import RegistrationForm from './components/register';
import LoginForm from './components/login';

import GoogleMapWrapper from './components/GoogleMapWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/login" component={ReportForm} />
        <Route exact path="/" component={GoogleMapWrapper} />
      </div>
    );
  }
}

export default App;
