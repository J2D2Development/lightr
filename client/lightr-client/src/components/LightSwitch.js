import React from 'react';
import PropTypes from 'prop-types';

export const LightSwitch = (props) => {
    return(
        <div>
            Fancy switch coming!<br />
            <input type="checkbox" id={props.id} checked={props.switchedOn} onChange={props.updateLightHandler} />
        </div>
    );
}

LightSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    switchedOn: PropTypes.bool.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}