import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Promise from 'promise-polyfill';
 
//Needed for onTouchTap 
//http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

//Promise polyfill (for iphone4 Safari)
if(!window.Promise) {
    window.Promise = Promise;
}

ReactDOM.render((<BrowserRouter><App /></BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
