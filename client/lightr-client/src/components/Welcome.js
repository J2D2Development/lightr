import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return(
            <div className="welcome-main">
                <h1>Welcome</h1>
                <Link to="/dashboard">Log In</Link>
            </div>
        );
    }
}

export default Welcome;