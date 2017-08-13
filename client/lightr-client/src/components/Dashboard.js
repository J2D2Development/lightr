import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import 'whatwg-fetch'; 
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
import { GroupSwitchIndividualView } from './GroupSwitchIndividualView';
import { GroupEdit } from './GroupEdit.js';

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
			backgroundColor: '#27ae60',
			color: '#fff'
		};
		this.snackbarFailStyles = {
			backgroundColor: '#e74c3c',
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
			this.setState({ groupData: Object.assign(this.state.groupData, jsonData) });
		}).catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	convertToArray(data, type) {
		let toReturn = [];

		for(const item in data) {
			if(data.hasOwnProperty(item)) {
				data[item]['myId'] = item;
				toReturn.push(data[item]);
			}
		}

		return [...toReturn].map((item, index) => {
			item.key = `${type}-${index + 1}`;
			item.linkTarget = `${type}s`;
			return item;
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

	//handle slider for bri property of individual light
	//TODO: doesn't work too well with fetch on every movement- how to fix?
	setLightBrightness = (light, value) => {		
		const lightData = Object.assign({}, this.state.lightData);
		const objId = light.myId;

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

	//handle slider for bri property of group
	//TODO: doesn't work too well with fetch on every movement- how to fix?
	setGroupBrightness = (group, value) => {		
		const groupData = Object.assign({}, this.state.groupData);
		const objId = group.myId;

		fetch(`${this.lightsUrl}/groups/${objId}/action`, {
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
			throw new Error(`Network Error updating group with id ${objId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			groupData[objId].action.bri = value;
			this.setState({ groupData });
			this.getLightData(this.lightsUrl);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	setLightName = (light, value) => {		
		const lightData = Object.assign({}, this.state.lightData);
		const objId = light.myId;
		lightData[objId].name = value;
		this.setState({ lightData });
	}

	saveLightName = (light) => {
		const objId = light.myId;
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
	
	setGroupName = (group, value) => {		
		const groupData = Object.assign({}, this.state.groupData);
		const objId = group.myId;
		groupData[objId].name = value;
		this.setState({ groupData });
	}

	saveGroupName = (group) => {
		const objId = group.myId;
		const name = group.name;

		fetch(`${this.lightsUrl}/groups/${objId}`, {
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
			throw new Error(`Network Error updating group with id ${objId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			this.setGroupName(group, name);
			this.snackbarOpen('Group Updated', this.snackbarSuccessStyles);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	addLightToGroup = (groupId, lightId) => {
		const groupData = Object.assign({}, this.state.groupData);
		const lightsArray = groupData[groupId].lights;
		lightsArray.push(lightId);

		fetch(`${this.lightsUrl}/groups/${groupId}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ lights: lightsArray})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error updating group with id ${groupId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			this.setState({ groupData });
			this.snackbarOpen('Group Updated', this.snackbarSuccessStyles);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
	}

	removeLightFromGroup = (groupId, lightId) => {		
		const groupData = Object.assign({}, this.state.groupData);
		const lightsArray = groupData[groupId].lights;

		if(lightsArray.length === 1) {
			this.snackbarOpen('Cannot remove last light from group!', this.snackbarFailStyles);
			return;
		}

		lightsArray.splice(lightsArray.indexOf(lightId), 1);

		console.log('group data after remove:', groupData);

		fetch(`${this.lightsUrl}/groups/${groupId}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({lights: lightsArray})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error updating group with id ${groupId}`);
		})
		.then(jsonData => {
			if(jsonData[0].error) {
				this.snackbarOpen(jsonData[0].error.description);
				return;
			}
			
			this.setState({ groupData });
			this.snackbarOpen('Group Updated', this.snackbarSuccessStyles);
		})
		.catch(err => {
			this.snackbarOpen(err.message);
		});
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
		const convertedLightData = this.convertToArray(this.state.lightData, 'light');
		const convertedGroupData = this.convertToArray(this.state.groupData, 'group');

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
						<Route exact path="/dashboard/lights/:lightId" 
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
						<Route exact path="/dashboard/groups/:groupId" 
							render={(routeParams)=><GroupSwitchIndividualView match={routeParams}
								groupData={convertedGroupData}
								updateGroupHandler={this.toggleGroupState}
								updateBrightnessHandler={this.setGroupBrightness}
								updateLightNameHandler={this.setGroupName}
								saveLightNameHandler={this.saveGroupName}
								titleEdit={this.state.lightTitleEdit}
								showTitleEdit={this.showTitleEdit}
								hideTitleEdit={this.hideTitleEdit} />
							} 
						/>
						<Route exact path="/dashboard/groups/:groupId/edit"
							render={(routeParams) => <GroupEdit match={routeParams}
								lightData={convertedLightData}
								groupData={convertedGroupData}
								updateGroupNameHandler={this.setGroupName}
								saveGroupNameHandler={this.saveGroupName}
								addLightToGroup={this.addLightToGroup}
								removeLightFromGroup={this.removeLightFromGroup} />
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