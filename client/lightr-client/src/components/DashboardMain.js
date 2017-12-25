import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export const DashboardMain = (props) => {
    const lights = props.lightData;
    const groups = props.groupData;
    const lists = [];
    const loadErrorStyle = {
        fontWeight: 'italic',
        fontSize: '0.75em',
        marginTop: '0.5em',
        textAlign: 'center',
        color: '#e74c3c'
    };

    const loadingComplete = !props.lightFetchStatus.loading && !props.groupFetchStatus.loading;
    const loadingFailed = loadingComplete && (!props.lightFetchStatus.success && !props.groupFetchStatus.success);

    return(
        <div className="panel-main__wrapper">
            <Card className="panel-main__panel panel-half__lg">
                <CardHeader title="Lights"
                    avatar={<FontIcon className="fa fa-lightbulb-o"/>}
                />
                <CardTitle title="Manage Lights" />
                <CardText>
                    <div>
                        View and update the status of lights enabled with online control at Bluebell Cottage
                    </div>
                    <div>
                        {props.lightFetchStatus.loading ? 
                            <div>Loading Light Data...</div>
                            :
                            <div>Total Lights Available: {lights.length}</div>
                        }
                        {props.groupFetchStatus.loading ?
                            <div>Loading Group Data...</div>
                            :
                            <div>Total Groups Available: {groups.length}</div>
                        }
                    </div>
                </CardText>
                <CardActions>
                    <FlatButton label={
                            (loadingComplete)
                            ?
                            "Change Status"
                            :
                            "Loading..."
                        } 
                        primary={true} 
                        disabled={!loadingComplete || loadingFailed}
                        containerElement={<Link to="/dashboard/lights" />} 
                    />
                    {
                        loadingFailed
                        &&
                        <div style={loadErrorStyle}>Lights currently unavailable- looks like you might be on the wrong network!</div>
                    }
                </CardActions>
            </Card>
            <Card className="panel-main__panel panel-half__lg">
                <CardHeader title="Lists"
                    avatar={<FontIcon className="fa fa-list"/>} 
                />
                <CardTitle title={'Total Available: ' + lists.length} />
                <CardText>
                    View and update shopping and/or task lists.  <em>Coming soon...</em>
                </CardText>
                <CardActions>
                    <FlatButton 
                        label="Click to Manage" 
                        primary={true} 
                        containerElement={<Link to="/dashboard/lists" />} 
                    />
                </CardActions>
            </Card>
        </div>
    );
}