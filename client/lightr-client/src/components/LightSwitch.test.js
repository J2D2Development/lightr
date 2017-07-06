/*eslint-disable*/
import React from 'react';
import LightSwitch from './LightSwitch';

describe('LightSwitch component tests', () => {
    it('Should render without error', () => {
        <LightSwitch id="testId" switchedOn={true} updateLightHandler={() => {}} />
    });
});