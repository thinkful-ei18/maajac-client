import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './components/LandingPage'
import RegistrationForm from './components/register';
import LoginForm from './components/login';
import ReportForm from './components/report';

import './App.css';

class App extends Component {
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

export default App;
