import React, { Component } from 'react';

import './App.css';
import ReportForm from './components/report';
import RegistrationForm from './components/register';
import LoginForm from './components/login';

import GoogleMapWrapper from './components/GoogleMapWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationForm/>
        <LoginForm/>
        {/* <ReportForm /> */}
        <GoogleMapWrapper />
      </div>
    );
  }
}

export default App;
