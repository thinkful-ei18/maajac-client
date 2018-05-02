import React, { Component } from 'react';

import './App.css';
import ReportForm from './components/report';
import GoogleMapWrapper from './components/GoogleMapWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <ReportForm /> */}
        <GoogleMapWrapper />
      </div>
    );
  }
}

export default App;
