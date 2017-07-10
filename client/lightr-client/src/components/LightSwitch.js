import React from 'react';
import PropTypes from 'prop-types';

export const LightSwitch = (props) => {
    return(
        <div>
            <label htmlFor={props.id+'on'}>
                <input type="radio" name={props.id} id={props.id+'on'} value="on" checked={props.switchedOn} onChange={props.updateLightHandler} />
                <span>On</span>
            </label>
            <label htmlFor={props.id+'off'}>
                <input type="radio" name={props.id} id={props.id+'off'} value="off" checked={!props.switchedOn} onChange={props.updateLightHandler} />
                <span>Off</span>
            </label>
        </div>
    );
}

LightSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    switchedOn: PropTypes.bool.isRequired,
    updateLightHandler: PropTypes.func.isRequired
}