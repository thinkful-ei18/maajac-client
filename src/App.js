import React, { Component } from 'react';
import GoogleApiWrapper from './components/GoogleApiWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleApiWrapper /> 
      </div>
    );
  }
}

export default App;
