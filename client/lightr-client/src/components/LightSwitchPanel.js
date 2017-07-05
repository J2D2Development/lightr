import React from 'react';

export const LightSwitchPanel = (props) => {
    let lightData = props.lightData;
    let lights = [], display = [];
    
    if(lightData) {
        for(const item in lightData) {
            if(lightData.hasOwnProperty(item)) {
                lights.push(lightData[item]);
            }
        }

        display = lights.map((light, index) => {
            const key = `light-${index}`;
            return (
                <li key={key}>{light.name}: {light.type}</li>
            );
        });
    }

    return(
        <div>
            I will be a light switch panel.  I will have multiple switch groups!
            <ul>{display}</ul>
        </div>
    );
}