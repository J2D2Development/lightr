import React, { Component } from 'react';
import { LightSwitchPanel } from './components/LightSwitchPanel';
import logo from './img/j2d2-logo-md.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bluebell Lights</h2>
        </div>
        <small>Note- you must be on the right network to access.  If you're not on J2D2, you're out of luck</small>
        <div className="panel-wrapper">
          <LightSwitchPanel />
          <LightSwitchPanel />
          <LightSwitchPanel />
        </div>
      </div>
    );
  }
}

export default App;
