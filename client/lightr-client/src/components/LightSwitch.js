import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

export const LightSwitch = (props) => {
    //console.log('switch:', props);
    return(
        <div>
            <Toggle label={props.switchedOn ? 'On' : 'Off'} 
                name={props.id} 
                id={props.id}
                toggled={props.switchedOn} 
                onToggle={props.updateLightHandler} 
            />
        </div>
    );
}

// LightSwitch.propTypes = {
//     id: PropTypes.string.isRequired,
//     switchedOn: PropTypes.bool.isRequired,
//     updateLightHandler: PropTypes.func.isRequired
// }