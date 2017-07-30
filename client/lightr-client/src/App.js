import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
	mainAppStyles = { minHeight: '100%', height: '100%' };

	render() {
		return(
			<MuiThemeProvider>
				<div style={this.mainAppStyles}>
					<Route exact path="/" component={Welcome} />
					<Route path="/dashboard" component={Dashboard} />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App;
