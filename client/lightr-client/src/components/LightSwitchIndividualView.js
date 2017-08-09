import React from 'react';

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

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
            <CardHeader 
                title={<span>
                        <TextField 
                            id={"title" + id} 
                            value={thisLight && thisLight.name} 
                            onChange={(evt, value) => props.updateLightNameHandler(thisLight, value)}
                        />
                        <FlatButton
                            label="Save"
                            primary={true}
                            onTouchTap={(evt) => props.saveLightNameHandler(thisLight)}
                        />
                    </span>} 
                subtitle={thisLight && thisLight.type} 
            />
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