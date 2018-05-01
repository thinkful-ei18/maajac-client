import React, { Component } from 'react';

import './App.css';
import {reportForm as Report} from './components/report';
import GoogleApiWrapper from './components/GoogleApiWrapper';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Report/>
        <GoogleApiWrapper /> 

      </div>
    );
  }
}

export default App;
