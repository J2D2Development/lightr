import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import config from '../config';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { DashboardMain } from './DashboardMain';
import { LightSwitchPanels } from './LightSwitchPanels';
import { LightSwitchIndividualView } from './LightSwitchIndividualView';

const FourOhFour = () => {
	return(
		<h1>Not Found!</h1>
	);
};

class Dashboard extends Component {
    constructor() {
		super();
		this.lightsUrl = `http://192.168.1.12/api/${config.HUE_API_KEY}`; //`http://localhost:8001/api/lights`;
		this.snackbarSuccessStyles = {
			backgroundColor: 'green',
			color: '#fff'
		};
		this.state = {
			lightData: {},
			lightTitleEdit: { show: false },
			groupData: {},
			sidebar: { open: false },
			snackbar: { open: false, message: 'Default message', contentStyle: {} }
		};
	}

	componentWillMount = () => {
		this.getLightData(this.lightsUrl);
		this.getGroupData(this.lightsUrl);
	}

	getLightData = (urlBase) => {
		fetch(`${urlBase}/lights`, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error('Network error getting light data');
		}).then(jsonData => {
			this.setState({ lightData: Object.assign(this.state.lightData, jsonData) });
		}).catch(err => {
			console.log(err);
			this.snackbarOpen(err.message);
		});
	}

	getGroupData = (urlBase) => {
		fetch(`${urlBase}/groups`, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error('Network error getting group data');
		}).then(jsonData => {
			console.log(jsonData);
			this.setState({ groupData: Object.assign(this.state.groupData, jsonData) });
		}).catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	convertLightsToArray(lightData) {
		let lights = [];

		for(const item in lightData) {
			if(lightData.hasOwnProperty(item)) {
				//need ref to the original object's prop (id number) for updating later
				lightData[item]['lightId'] = item;
				lights.push(lightData[item]);
			}
		}

		return [...lights].map((light, index) => {
			light.key = `light-${index + 1}`;
			return light;
		});
	}

	showTitleEdit = () => { 
		const lightTitleEdit = Object.assign({}, this.state.lightTitleEdit);
		lightTitleEdit.show = true;
		this.setState({ lightTitleEdit} );
	}

    hideTitleEdit = () => { 
		const lightTitleEdit = Object.assign({}, this.state.lightTitleEdit);
		lightTitleEdit.show = false;
		this.setState({ lightTitleEdit} );
	}

	toggleLightState = (evt) => {
		const objId = +evt.target.id.match(/\d+/g).join('');
		const lightData = Object.assign({}, this.state.lightData);
		const toggleOnState = !lightData[objId].state.on;

		fetch(`${this.lightsUrl}/lights/${objId}/state`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({on: toggleOnState})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error updating light with id ${objId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			lightData[objId].state.on = toggleOnState;
			this.setState({ lightData });
			this.getGroupData(this.lightsUrl);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	toggleGroupState = (evt) => {
		const objId = +evt.target.id.match(/\d+/g).join('');
		const groupData = Object.assign({}, this.state.groupData);
		const toggleOnState = !groupData[objId].state.all_on;

		fetch(`${this.lightsUrl}/groups/${objId}/action`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({on: toggleOnState})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error updating group with id ${objId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			groupData[objId].state.all_on = toggleOnState;
			this.setState({ groupData });
			this.getLightData(this.lightsUrl);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	//handle slider for bri property of light
	//TODO: doesn't work too well with fetch on every movement- how to fix?
	setLightBrightness = (light, value) => {		
		const lightData = Object.assign({}, this.state.lightData);
		const objId = light.lightId;

		fetch(`${this.lightsUrl}/lights/${objId}/state`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({bri: value})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error updating light with id ${objId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			lightData[objId].state.bri = value;
			this.setState({ lightData });
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	setLightName = (light, value) => {		
		const lightData = Object.assign({}, this.state.lightData);
		const objId = light.lightId;
		lightData[objId].name = value;
		this.setState({ lightData });
	}

	saveLightName = (light) => {
		const objId = light.lightId;
		const name = light.name;

		fetch(`${this.lightsUrl}/lights/${objId}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({name})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error updating light with id ${objId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			this.setLightName(light, name);
			this.hideTitleEdit();
			this.snackbarOpen('Name Updated', this.snackbarSuccessStyles);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}
	
	//same as update light, but work with groups
	updateGroup = () => {

	}

	toggleSidebar = (val) => {
		const sidebar = Object.assign({}, this.state.sidebar);
		sidebar.open = !sidebar.open;
		this.setState({ sidebar });
	}

	snackbarClose = () => {
		const snackbar = Object.assign({}, this.state.snackbar);
		snackbar.open = false;
		this.setState({ snackbar });
	}

	snackbarOpen = (message, style) => {
		const snackbar = Object.assign({}, this.state.snackbar);
		snackbar.message = message;
		snackbar.contentStyle = style;
		snackbar.open = true;
		this.setState({ snackbar });
	}

	styles = {
		mainDashStyle: { backgroundColor: '#333333', color: '#fff', minHeight: '100%' },
		appBarStyle: { color: '#fff' },
		viewportStyle: { padding: '0.5em' },
		sidebarh1: { padding: '0.5em' },
		sidebarButton: { marginBottom: '0.5em' }
	};

    
    render() {
		const convertedLightData = this.convertLightsToArray(this.state.lightData);
		const convertedGroupData = this.convertLightsToArray(this.state.groupData);

        return(
            <div style={this.styles.mainDashStyle}>
				<AppBar
					title="Bluebell Dashboard"
					onLeftIconButtonTouchTap={this.toggleSidebar}
					iconElementRight={<FlatButton label={
						<FontIcon style={this.styles.appBarStyle} className="fa fa-user"/>
					} />}
				/>
				<Drawer 
					docked={false}
					open={this.state.sidebar.open}
					onRequestChange={this.toggleSidebar}
				>
					<h2 style={this.styles.sidebarh1}>Menu</h2>
					<RaisedButton label="Dashboard Home" primary={true} fullWidth={true} 
						style={this.styles.sidebarButton}
						containerElement={<Link to="/dashboard" />}
						onTouchTap={this.toggleSidebar}
					/>
					<RaisedButton label="Manage Lights" primary={true} fullWidth={true} 
						style={this.styles.sidebarButton}
						containerElement={<Link to="/dashboard/lights" />}
						onTouchTap={this.toggleSidebar}
					/>
				</Drawer>

				<Snackbar 
					open={this.state.snackbar.open}
					message={this.state.snackbar.message}
					bodyStyle={this.state.snackbar.contentStyle}
					contentStyle={this.state.snackbar.contentStyle}
					autoHideDuration={4000}
					onRequestClose={this.snackbarClose}
				/>

				<div style={this.styles.viewportStyle}>
					<Switch>
						<Route exact path="/dashboard" 
							render={()=><DashboardMain 
								lightData={convertedLightData}
								groupData={convertedGroupData}
							/>} 
						/>
						<Route exact path="/dashboard/lights" 
							render={()=><LightSwitchPanels 
								lightData={convertedLightData} 
								updateLightHandler={this.toggleLightState}
								groupData={convertedGroupData}
								updateGroupHandler={this.toggleGroupState} />}
						/>
						<Route path="/dashboard/lights/:lightId" 
							render={(routeParams)=><LightSwitchIndividualView match={routeParams}
								lightData={convertedLightData}
								updateLightHandler={this.toggleLightState}
								updateBrightnessHandler={this.setLightBrightness}
								updateLightNameHandler={this.setLightName}
								saveLightNameHandler={this.saveLightName}
								titleEdit={this.state.lightTitleEdit}
								showTitleEdit={this.showTitleEdit}
								hideTitleEdit={this.hideTitleEdit} />
							} 
						/>
						<Route component={FourOhFour} />
					</Switch>
				</div>			
            </div>
        );
    }
}

export default Dashboard;