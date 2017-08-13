import React from 'react';

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

import { LightSwitch } from './LightSwitch';

export const GroupSwitchIndividualView = (props) => {
    const id = props.match.match.params.groupId;
    let thisItem;

    for(let item in props.groupData) {
        if(item == Number(id) - 1) {
            thisItem = props.groupData[item];
        }
    }

	return(
		<Card className="light-switch__panel">
            <CardHeader 
                title={
                    props.titleEdit.show ?
                    <span>
                        <TextField 
                            id={"title" + id} 
                            value={thisItem && thisItem.name} 
                            onChange={(evt, value) => {
                                    console.log('changing...', value);
                                    props.updateLightNameHandler(thisItem, value);
                                }
                            }
                            autoFocus
                        />
                        <FlatButton
                            label="Save"
                            primary={true}
                            onTouchTap={(evt) => props.saveLightNameHandler(thisItem)}
                        />
                        <FlatButton
                            label="Cancel"
                            secondary={true}
                            onTouchTap={props.hideTitleEdit}
                        />
                    </span> :
                    <span>
                        {thisItem && thisItem.name}
                        <FlatButton
                            className="light-switch__panel-hidesmall"
                            label="Edit"
                            primary={true}
                            onTouchTap={props.showTitleEdit}
                        />
                    </span>
                } 
                subtitle={thisItem && thisItem.type} 
            />
            <CardTitle title={
                <LightSwitch 
                    id={id} switchedOn={thisItem && thisItem.state.all_on} 
                    updateLightHandler={props.updateGroupHandler}
                />}
            />
            <CardText>
                Current Brightness: {thisItem && (thisItem.state.all_on ? thisItem.action.bri : 'Off')}
                <Slider
                    disabled={thisItem && !thisItem.state.all_on}
                    min={0}
                    max={255}
                    step={1}
                    value={thisItem && thisItem.action.bri}
                    onChange={(evt, value) => props.updateBrightnessHandler(thisItem, value)}
                />
            </CardText>
        </Card>
	);
}