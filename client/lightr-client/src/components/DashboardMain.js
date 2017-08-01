import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export const DashboardMain = (props) => {
    const lights = props.lightData;
    const lists = [];

    return(
        <div className="panel-main__wrapper">
            <Card className="panel-main__panel panel-half__lg">
                <CardHeader title="Manage Lights"
                    avatar={<FontIcon className="fa fa-lightbulb-o"/>}
                />
                <CardTitle title={'Total Available: ' + lights.length} />
                <CardText>
                    View and update the status of lights enabled with online control at Bluebell Cottage
                </CardText>
                <CardActions>
                    <FlatButton label="Change Status" primary={true} 
                        containerElement={<Link to="/dashboard/lights" />} 
                    />
                </CardActions>
            </Card>
            <Card className="panel-main__panel panel-half__lg">
                <CardHeader title="Manage Lists"
                    avatar={<FontIcon className="fa fa-list"/>} 
                />
                <CardTitle title={'Total Available: ' + lists.length} />
                <CardText>
                    View and update shopping and/or task lists.  Coming soon...
                </CardText>
                <CardActions>
                    <FlatButton label="Click to Manage" primary={true} 
                        containerElement={<Link to="/dashboard/lists" />} 
                    />
                </CardActions>
            </Card>
        </div>
    );
}