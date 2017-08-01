import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

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
		this.lightsUrl = 'http://localhost:4001/api/lights';
		this.state = {
			lightData: {},
			sidebar: { open: false },
			snackbar: { open: false }
		};
	}

	componentWillMount = () => {
		this.getLightData(this.lightsUrl);
	}

	getLightData = (urlBase) => {
		fetch(urlBase, {
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
			this.setState({ lightData: Object.assign(this.state.lightData, jsonData) }, () => {
				this.snackbarOpen();
			});
		}).catch(err => {
			console.log('error:', err.message);
			//TODO: snackbar show error
		});
	}

	//TODO: test this when hub is set up, won't work with fake api
	findNewLights = (urlBase) => {
		fetch(urlBase, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error('Network Error searching for new lights');
		})
		.then(jsonData => {
			console.log('new lights?', jsonData);
			this.setState({ lightData: Object.assign(this.state.lightData, jsonData) });
		})
		.catch(err => {
			console.log('error with fetch:', err.message);
			//TODO: snackbar show error
		});
	}

	//TODO: test this when hub is set up, won't work with fake api
	setLightName = (urlBase, lightId) => {
		fetch(`${urlBase}/${lightId}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(`Network Error renaming light with id ${lightId}`);
		})
		.then(jsonData => {
			console.log('light name updated', jsonData);
			//method only returns new name, so we have to get light data again for update
			this.getLightData(this.urlBase);
		})
		.catch(err => {
			console.log('error with fetch:', err.message);
			//TODO: snackbar show error
		});
	}

	//TODO: finish and test this when hub is set up, won't work with fake api
	//setLightState = (urlBase, lightId)

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

	updateLight = (evt) => {
		const objId = +evt.target.id.match(/\d+/g).join('');
		const lightData = Object.assign({}, this.state.lightData);
        lightData[objId].state.on = !lightData[objId].state.on;
		this.setState({ lightData });
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

	snackbarOpen = () => {
		const snackbar = Object.assign({}, this.state.snackbar);
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
					message="Snackbar test - replace me"
					autoHideDuration={4000}
					onRequestClose={this.snackbarClose}
				/>

				<div style={this.styles.viewportStyle}>
					<Switch>
						<Route exact path="/dashboard" 
							render={()=><DashboardMain lightData={convertedLightData}/>} 
						/>
						<Route exact path="/dashboard/lights" 
							render={()=><LightSwitchPanels 
								lightData={convertedLightData} 
								updateLightHandler={this.updateLight} />}
						/>
						<Route path="/dashboard/lights/:lightId" 
							render={(routeParams)=><LightSwitchIndividualView match={routeParams}
								lightData={convertedLightData}
								updateLightHandler={this.updateLight} />
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