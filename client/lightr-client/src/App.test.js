import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('Basic app loading tests', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});

	//TODO: look up how to test react lifecycle methods
	// it('Sets light state', () => {

	// })
});

