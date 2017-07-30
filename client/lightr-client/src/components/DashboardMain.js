import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export const DashboardMain = (props) => {
    const lights = props.lightData;
    const lists = [];

    const styles = {
        wrapper: { display: 'flex', justifyContent: 'space-around' },
        card: { width: '48%' }
    };

    return(
        <div style={styles.wrapper}>
            <Card style={styles.card}>
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
            <Card style={styles.card}>
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