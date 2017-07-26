import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { LightSwitchPanel } from './components/LightSwitchPanel';
import './App.css';

/*
    fetch() state here from phillips api (or mock) and pass into app.
    to make it easy to switch, use:
        import Api from '../api'
        -will that work?  or use env variable to test: if development, use mock?
        -using mock working
            -next: pass into state and set up light switches appropriately
*/

const Test = () => {
	return(
		<h1>Test route!</h1>
	)
}

class App extends Component {
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
		console.log(evt.target.value);
		lightData[objId].state.on = evt.target.value === 'on' ? true : false;
		this.setState({ lightData });
	}

	render() {
		return(
			<div className="App">
				<div className="App-header">
					<h2>Bluebell Dashboard</h2>
				</div>
				<small>Note- you must be on the right network to access.  If you're not on J2D2, you're out of luck</small>
				<Link to="/">Home</Link>
				<Link to="/lights">Manage Lights</Link>
				<Link to="/test">Test Route</Link>

				<Route path="/lights" 
					render={()=><LightSwitchPanel lightData={this.state.lightData} 
					updateLightHandler={this.updateLight} />}
				/>
				<Route path="/test" component={Test}/>
			</div>
		)
	}
}

// const routeWrapper = () => {
//     return (
// 			<Router>
// 				<div>
// 					<Link to="/">Home</Link>
// 					<Link to="/lights">Lights</Link>
// 				</div>
// 				<Route exact path="/" component={Home}/>
//       	<Route path="/lights" component={LightSwitchPanel}
// 				render={()=><TestWidget num="2" someProp={100}/>}/>
// 			</Router>
//     );
//   }
// }

// export default routeWrapper;
export default App;
