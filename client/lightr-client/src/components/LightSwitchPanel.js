import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { LightSwitch } from './LightSwitch';

export const LightSwitchPanel = (props) => {
    return(
        <Card key={props.id} className="panel-main__panel panel-small">
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
                    containerElement={<Link to={"/dashboard/" + props.thisLightData.linkTarget + "/" + props.thisLightData.myId} />}
                />
                {
                    props.thisLightData.linkTarget === 'groups' &&
                    <FlatButton 
                        label="Edit" secondary={true} 
                        containerElement={<Link to={"/dashboard/" + props.thisLightData.linkTarget + "/" + props.thisLightData.myId + "/edit"} />}
                    />
                }
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