import React from 'react';

import { Card, CardHeader, CardTitle } from 'material-ui/Card';

import { LightSwitch } from './LightSwitch';

export const LightSwitchIndividualView = (props) => {
    const id = props.match.match.params.lightId;
    let thisLight;
    for(let light in props.lightData) {
        if(light == Number(id) - 1) {
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