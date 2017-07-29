import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardMain = (props) => {
    return(
        <div className="dash-grid__wrapper">
            <div className="dash-grid__element">
                Manage Lights
                <Link to="/dashboard/lights">Go</Link>
            </div>
            <div className="dash-grid__element">

            </div>
            <div className="dash-grid__element"></div>
            <div className="dash-grid__element"></div>
        </div>
    );
}