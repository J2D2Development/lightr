import React from 'react';

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Slider from 'material-ui/Slider';

import { LightSwitch } from './LightSwitch';

export const LightSwitchIndividualView = (props) => {
    const id = props.match.match.params.lightId;
    let thisLight;
    for(let light in props.lightData) {
        if(light == Number(id) - 1) {
            thisLight = props.lightData[light];
        }
    }
    console.log(thisLight);

	return(
		<Card className="light-switch__panel">
            <CardHeader title={thisLight && thisLight.name} subtitle={thisLight && thisLight.type} />
            <CardTitle title={
                <LightSwitch 
                    id={id} switchedOn={thisLight && thisLight.state.on} 
                    updateLightHandler={props.updateLightHandler}
                />}
            />
            <CardText>
                Current Brightness: {thisLight && (thisLight.state.on ? thisLight.state.bri : 'Off')}
                <Slider
                    disabled={thisLight && !thisLight.state.on}
                    min={0}
                    max={255}
                    step={1}
                    value={thisLight && thisLight.state.bri}
                    onChange={(evt, value) => props.updateBrightnessHandler(thisLight, value)}
                />
            </CardText>
        </Card>
	);
}