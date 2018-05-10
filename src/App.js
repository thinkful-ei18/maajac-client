import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RootPage from './components/RootPage';
import LandingPage from './components/LandingPage';
import Filter from './components/Filter';
import RegistrationForm from './components/register';
import LoginForm from './components/Login';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Search from './components/SearchBox';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={RootPage} />
        <Route exact path="/map" component={LandingPage} />
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/report" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
}

export default App;
