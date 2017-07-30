import React from 'react';
import PropTypes from 'prop-types';

import { LightSwitchPanel } from './LightSwitchPanel';

export const LightSwitchPanels = (props) => {
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
                <LightSwitchPanel
                    key={key} id={key}
                    title={light.name} subtitle={light.type}
                    switchedOn={light.state.on}
                    updateLightHandler={updateLightHandler}
                />
            );
        });
    }

    return(
        <div>
            <h3>Manage Lights</h3>
            <div className="light-switch__panels">
                {display}
            </div>
        </div>
    );
}

LightSwitchPanels.propTypes = {
    lightData: PropTypes.object.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}