import React from 'react';

import { Card, CardHeader, CardTitle } from 'material-ui/Card';

import { LightSwitch } from './LightSwitch';

export const LightSwitchIndividualView = (props) => {
    const id = props.match.match.params.lightId;
    const lightName = id.split('-').join(' ');
    let thisLight;
    for(let light in props.lightData) {
        if(props.lightData[light].name.toLowerCase() === lightName) {
            thisLight = props.lightData[light];
        }
    }

	return(
		<Card className="light-switch__panel">
            <CardHeader title={thisLight && thisLight.name} subtitle={thisLight && thisLight.type} />
            <CardTitle title={
                <LightSwitch 
                    id={id} switchedOn={thisLight && thisLight.state.on} 
                    updateLightHandler={props.updateLightHandler}
                />}
            />
        </Card>
	);
}