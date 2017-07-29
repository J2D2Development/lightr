import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { LightSwitch } from './LightSwitch';

export const LightSwitchPanel = (props) => {
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
                <Card key={key}>
                    <CardHeader title={light.name} subtitle={light.type} />
                    <CardTitle title={
                        <LightSwitch 
                            id={key} switchedOn={light.state.on} 
                            updateLightHandler={updateLightHandler}
                        />}
                    />
                    <CardActions>
                        <FlatButton label="Manage" primary={true} />
                    </CardActions>
                </Card>
            );
        });
    }

    const styles = { display: 'flex', justifyContent: 'space-around' };

    return(
        <div>
            <h3>Manage Lights</h3>
            <div style={styles}>
                {display}
            </div>
        </div>
    );
}

LightSwitchPanel.propTypes = {
    lightData: PropTypes.object.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}