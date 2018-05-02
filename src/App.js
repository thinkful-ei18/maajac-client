import React, { Component } from 'react';

import './App.css';
import { Route, withRouter } from 'react-router-dom'
import ReportForm from './components/report';
import GoogleMapWrapper from './components/GoogleMapWrapper';
import Navbar from './components/navbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/submit' component={ReportForm} />

        <Navbar />
        {/* <ReportForm /> */}
        <GoogleMapWrapper />
      </div>
    );
  }
}

export default App;
