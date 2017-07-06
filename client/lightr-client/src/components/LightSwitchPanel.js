import React from 'react';
import PropTypes from 'prop-types';
import { LightSwitch } from './LightSwitch';

export const LightSwitchPanel = (props) => {
    let lightData = props.lightData;
    let updateLightHandler = props.updateLightHandler;
    let lights = [], display = [];
    
    if(lightData) {
        for(const item in lightData) {
            if(lightData.hasOwnProperty(item)) {
                lights.push(lightData[item]);
            }
        }

        display = lights.map((light, index) => {
            const key = `light-${index + 1}`;
            return (
                <li key={key}>
                    {light.name}: {light.type}<br />
                    Status: {light.state.on ? 'On' : 'Off'}<br />
                    <LightSwitch id={key} switchedOn={light.state.on} updateLightHandler={updateLightHandler} />
                </li>
            );
        });
    }

    return(
        <div>
            I will be a light switch panel.  I will have multiple switch groups!
            <ul>{display}</ul>
        </div>
    );
}

LightSwitchPanel.propTypes = {
    lightData: PropTypes.object.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}