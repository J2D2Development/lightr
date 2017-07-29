import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
	render() {
		return(
			<MuiThemeProvider>
				<div>
					<Route exact path="/" component={Welcome} />
					<Route path="/dashboard" component={Dashboard} />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App;
