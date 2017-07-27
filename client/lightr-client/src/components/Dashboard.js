import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { LightSwitchPanel } from './LightSwitchPanel';

class Dashboard extends Component {
    constructor() {
		super();
		this.state = {
			lightData: {}
		};
	}

	componentWillMount = () => {
		this.getLightData('http://localhost:4001/api/lights');
	}

	getLightData = (lightsUrl) => {
		fetch(lightsUrl, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			return response.json();
		}).then(jsonData => {
			this.setState({ lightData: Object.assign(this.state.lightData, jsonData) });
		}).catch(err => {
			console.log('error:', err);
			//notifyr show error
		});
	}

	updateLight = (evt) => {
		const objId = +evt.target.id.match(/\d+/g).join('');
		const lightData = Object.assign({}, this.state.lightData);
        lightData[objId].state.on = !lightData[objId].state.on;
		this.setState({ lightData });
    }
    
    render() {
        return(
            <div>
                <h1>My Dashboard</h1>
                <LightSwitchPanel 
                    lightData={this.state.lightData} 
					updateLightHandler={this.updateLight} 
                />
            </div>
        )
    }
}

export default Dashboard;