import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import { Route, withRouter } from 'react-router-dom'
import ReportForm from './components/report';
import RegistrationForm from './components/register';
import LoginForm from './components/login';

import GoogleMapWrapper from './components/GoogleMapWrapper';
import Navbar from './components/navbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/report" component={ReportForm} />
        <Route exact path="/" component={GoogleMapWrapper} />
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default App;
