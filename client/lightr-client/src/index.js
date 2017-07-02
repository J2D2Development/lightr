import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
    fetch() state here from phillips api (or mock) and pass into app.
    to make it easy to switch, use:
        import Api from '../api'
        -will that work?  or use env variable to test: if development, use mock?
        -using mock workin
            -next: pass into state and set up light switches appropriately
*/
const lightData = fetch('http://localhost:4001/api/lights', {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});
lightData.then(response => {
    return response.json();
}).then(jsonData => {
    console.log('now json?', jsonData);
}).catch(err => {
    console.log('error:', err);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
