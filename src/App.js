import React, { Component } from 'react';

import './App.css';
import reportForm from './components/report';
// import GoogleApiWrapper from './components/GoogleApiWrapper';


class App extends Component {
  render() {
    return (
      <div className="App">
        <reportForm/>
        {/* <GoogleApiWrapper />  */}
      </div>
    );
  }
}

export default App;
