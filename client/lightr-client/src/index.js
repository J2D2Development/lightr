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
*/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
