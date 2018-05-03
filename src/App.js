import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import RegistrationForm from './components/register';
import LoginForm from './components/Login';
import ReportForm from './components/report';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/report" component={ReportForm} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
