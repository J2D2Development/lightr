import React from 'react';
import PropTypes from 'prop-types';

export const Video = (props) => {
    return(
        <video playsInline autoPlay muted loop id={props.vidId}>
            <source src={props.srcMp4} type="video/mp4" />
        </video>
    )
};

Video.propTypes = {
    srcMp4: PropTypes.string.isRequired,
    vidId: PropTypes.string.isRequired
};