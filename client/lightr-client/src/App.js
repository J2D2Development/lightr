import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './components/Dashboard';
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
	render() {
		return(
			<MuiThemeProvider>
				<div className="App">
					Welcome
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/">Home</Link>

					<Route path="/dashboard" component={Dashboard} />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App;
