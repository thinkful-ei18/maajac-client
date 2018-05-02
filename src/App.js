import React, { Component } from 'react';

import './App.css';
import ReportForm from './components/report';
import GoogleMapWrapper from './components/GoogleMapWrapper';
import Navbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <ReportForm /> */}
        <GoogleMapWrapper />
      </div>
    );
  }
}

export default App;
