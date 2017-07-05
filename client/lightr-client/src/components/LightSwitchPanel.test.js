/*eslint-disable*/
import React from 'react';
import { LightSwitchPanel } from './LightSwitchPanel';

describe('Light Switch Panel Tests', () => {
    describe('Render test', () => {
        it('Should render without error', () => {
            <LightSwitchPanel />
        });
    });

    describe('Props tests', () => {
        it('lightData prop should be an object', () => {
            <LightSwitchPanel lightData={{}} />
            expect(typeof lightData).toBe('object');
        });
    });
});