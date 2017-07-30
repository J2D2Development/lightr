import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { LightSwitch } from './LightSwitch';

export const LightSwitchPanel = (props) => {
    //get name of light (passed as title), convert to something useable as a url, and set that as param for individual view (not great, but works for now)
    const param = props.title.toLowerCase().replace(/\s+/g, '-');
    return(
        <Card key={props.id} className="light-switch__panel">
            <CardHeader title={props.title} subtitle={props.subtitle} />
            <CardTitle title={
                <LightSwitch 
                    id={props.id} switchedOn={props.switchedOn} 
                    updateLightHandler={props.updateLightHandler}
                />}
            />
            <CardActions>
                <FlatButton 
                    label="Manage" primary={true} 
                    containerElement={<Link to={"/dashboard/lights/" + param} />}
                />
            </CardActions>
        </Card>
    );
}

LightSwitchPanel.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    switchedOn: PropTypes.bool.isRequired,
    updateLightHandler: PropTypes.func.isRequired
};