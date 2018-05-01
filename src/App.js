import React, { Component } from 'react';

import './App.css';
import ReportForm from './components/report';
// import GoogleApiWrapper from './components/GoogleApiWrapper';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ReportForm/>
        {/* <GoogleApiWrapper />  */}
      </div>
    );
  }
}

export default App;
