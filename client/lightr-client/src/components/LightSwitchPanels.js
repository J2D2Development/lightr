import React from 'react';
import PropTypes from 'prop-types';

import { LightSwitchPanel } from './LightSwitchPanel';

export const LightSwitchPanels = (props) => {
    console.log(props);
    //handle individual lights
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

    //handle groups
    let groupData = props.groupData;
    let updateGroupHandler = props.updateGroupHandler;
    let groupDisplay =[];
    if(groupData) {
        groupDisplay = groupData.map((group, index) => {
            return (
                <LightSwitchPanel
                    key={group.key} id={group.key}
                    thisLightData={group}
                    title={group.name} subtitle={group.type}
                    switchedOn={group.state.all_on}
                    updateLightHandler={updateGroupHandler}
                />
            );
        });
    }

    return(
        <div>
            <h3>Individual Lights</h3>
            <div className="panel-main__wrapper panels-small">
                {display}
            </div>
            <h3>Groups</h3>
            <div className="panel-main__wrapper panels-small">
                {groupDisplay.length > 0 ? groupDisplay : "No Groups Currently Available!"}
            </div>
        </div>
    );
}

LightSwitchPanels.propTypes = {
    lightData: PropTypes.array.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}