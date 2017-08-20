import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

export const LightSwitch = (props) => {
    //react throws 'switching from uncontrolled to controlled' error on a full refresh because switchedOn isn't provided until api call comes back.  This var just holds a place until it does, then updates properly.
    const on = props.switchedOn ? true : false;

    return(
        <div>
            <Toggle label={on ? 'On' : 'Off'} 
                name={props.id} 
                id={props.id}
                toggled={on} 
                onToggle={props.updateLightHandler} 
            />
        </div>
    );
}

LightSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    switchedOn: PropTypes.bool,
    updateLightHandler: PropTypes.func.isRequired
}