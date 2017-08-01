import React from 'react';
import PropTypes from 'prop-types';

import { LightSwitchPanel } from './LightSwitchPanel';

export const LightSwitchPanels = (props) => {
    let lightData = props.lightData;
    let updateLightHandler = props.updateLightHandler;
    let display = [];

    if(lightData) {
        display = lightData.map((light, index) => {
            return (
                <LightSwitchPanel
                    key={light.key} id={light.key}
                    thisLightData={light}
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
            <div className="panel-main__wrapper panels-small">
                {display}
            </div>
        </div>
    );
}

LightSwitchPanels.propTypes = {
    lightData: PropTypes.array.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}