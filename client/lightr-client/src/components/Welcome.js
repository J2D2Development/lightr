import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyCanvas from './MyCanvas';

class Welcome extends Component {
    constructor() {
        super();
        this.welcomeStyles = {
            height: '100%',
            minHeight: '100%',
            position: 'relative'
        };
        this.headlineStyles = {
            position: 'absolute',
            right: 0, left: 0,
            top: '50%',
            textAlign: 'center'
        };
    }

    render() {
        return(
            <div style={this.welcomeStyles} className="welcome-main">
                <MyCanvas />
                <div style={this.headlineStyles}>
                    <h1 style={{"margin": 0}}>Welcome</h1>
                    <Link to="/dashboard">Log In</Link>
                </div>
            </div>
        );
    }
}

export default Welcome;