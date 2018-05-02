import React, { Component } from 'react';

import './App.css';
import { reportForm as Report } from './components/report';
import GoogleMapWrapper from './components/GoogleMapWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Report />
        <GoogleMapWrapper />
      </div>
    );
  }
}

export default App;
