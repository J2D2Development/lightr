import React, { Component } from 'react';
import { LightSwitchPanel } from './components/LightSwitchPanel';
import logo from './img/j2d2-logo-md.png';
import './App.css';

/*
    fetch() state here from phillips api (or mock) and pass into app.
    to make it easy to switch, use:
        import Api from '../api'
        -will that work?  or use env variable to test: if development, use mock?
        -using mock working
            -next: pass into state and set up light switches appropriately
*/

class App extends Component {
	constructor() {
		super();
		this.state = {
			lightData: {}
		};
	}

	componentWillMount() {
		this.getLightData('http://localhost:4001/api/lights');
	}

	getLightData(lightsUrl) {
		fetch(lightsUrl, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			return response.json();
		}).then(jsonData => {
			this.setState({lightData: Object.assign(this.state.lightData, jsonData)});
		}).catch(err => {
			console.log('error:', err);
			//notifyr show error
		});
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bluebell Lights</h2>
        </div>
        <small>Note- you must be on the right network to access.  If you're not on J2D2, you're out of luck</small>
        <div className="panel-wrapper">
          <LightSwitchPanel lightData={this.state.lightData} />
        </div>
      </div>
    );
  }
}

export default App;
