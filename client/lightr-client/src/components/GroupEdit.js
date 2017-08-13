import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export const GroupEdit = (props) => {
    let id = props.match.match.params.groupId;
    let thisGroup = props.groupData.find(group => group.myId === id);

    // console.log('light data:', props.lightData);
    // console.log('group data:', props.groupData);

    let lightsInGroup = props.lightData
        .filter(light => thisGroup.lights.includes(light.myId))
        .map((light, index) => {
            return(<Chip key={'current-'+index}>{light.name}</Chip>);
        });
    let availableOtherLights = props.lightData
        .filter(light => !thisGroup.lights.includes(light.myId))
        .map((light, index) => {
            return(<Chip key={'available-'+index}>{light.name}</Chip>)
        });

    let chipWrapper = {
        display: 'flex'
    };

    return (
        thisGroup && 
            <form onSubmit={props.updateGroupSettings}>
                <Card>
                    <CardHeader title="Edit Group" />
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
                        <h3>Currently in this group</h3>
                        <div style={chipWrapper}>
                            {lightsInGroup.length > 0 ? lightsInGroup : "None"}
                        </div>
                        <h3>Available to add</h3>
                        <div style={chipWrapper}>
                            {availableOtherLights.length > 0 ? availableOtherLights : "None"}
                        </div>
                    </CardText>
                    <CardActions>
                        <FlatButton
                            label="Save"
                            primary={true}
                            onTouchTap={(evt) => console.log(evt)}
                        />
                        <FlatButton
                            label="Cancel"
                            secondary={true}
                            containerElement={<Link to="/dashboard/lights" />}
                        />
                    </CardActions>
                </Card>
            </form>
    );
}