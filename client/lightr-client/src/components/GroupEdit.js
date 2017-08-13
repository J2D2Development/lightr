import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export const GroupEdit = (props) => {
    let id = props.match.match.params.groupId;
    let thisGroup = props.groupData.find(group => group.myId === id);

    let lightsInGroup = props.lightData
        .filter(light => thisGroup.lights.includes(light.myId))
        .map((light, index) => {
            return(
                <Chip onRequestDelete={(evt) => props.removeLightFromGroup(id, light.myId)} key={'current-'+index}>
                    {light.name}
                </Chip>
            );
        });
    let availableOtherLights = props.lightData
        .filter(light => !thisGroup.lights.includes(light.myId))
        .map((light, index) => {
            return(
                <Chip onRequestDelete={(evt) => props.addLightToGroup(id, light.myId)} key={'available-'+index}>
                    {light.name}
                </Chip>
            )
        });

    let chipWrapper = {
        display: 'flex',
        flexWrap: 'wrap'
    };
    let groupsWrapper = {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '24px'
    };
    let groupWrapper = {
        marginRight: '24px',
        padding: '1em'
    };

    return (
        thisGroup && 
            <Card>
                <CardHeader title="Edit Light Group" />
                <CardText>
                    <TextField 
                        floatingLabelText="Group Name"
                        id={"title" + id} 
                        value={thisGroup.name} 
                        onChange={(evt, value) => {
                                props.updateGroupNameHandler(thisGroup, value);
                            }
                        }
                        autoFocus
                    />
                    <FlatButton
                        label="Save"
                        primary={true}
                        onTouchTap={(evt) => props.saveGroupNameHandler(thisGroup)}
                    />
                    <div style={groupsWrapper}>
                        <Paper zDepth={3} style={groupWrapper}>
                            <h3>Lights Currently in this group</h3>
                            <div style={chipWrapper}>
                                {lightsInGroup.length > 0 ? lightsInGroup : "None"}
                            </div>
                        </Paper>
                        <Paper zDepth={3} style={groupWrapper}>
                            <h3>Available to add</h3>
                            <div style={chipWrapper}>
                                {availableOtherLights.length > 0 ? availableOtherLights : "None"}
                            </div>
                        </Paper>
                    </div>
                </CardText>
            </Card>
    );
}