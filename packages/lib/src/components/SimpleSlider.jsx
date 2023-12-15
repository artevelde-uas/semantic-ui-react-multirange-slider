import React from 'react';

import MultirangeSlider from './MultirangeSlider';


/**
 * @module SimpleSlider
 * 
 * @description A SimpleSlider is used to modify a value inside a given range
 * 
 * @param {number} [min=0] - The minimum possible value
 * @param {number} [max=100] - The maximum possible value
 * @param {number} [step=1] - The step value
 * @param {number} [value=0] - The value of the slider
 * @param {string} [trackColor=black] - The color of the track
 * @param {function} [onInput] - Continuesly fired while the value changes
 * @param {function} [onChange] - Fired after the value has changed
 */
export default ({
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    trackColor = 'black',
    onInput,
    onChange
}) => {

    function handleInput(event, data) {
        onInput && onInput(event, {
            value: data.value,
            previousValue: data.previousValue,
            startValue: data.startValue,
            initialValue: data.initialValue
        });
    }

    function handleChange(event, data) {
        onChange && onChange(event, {
            value: data.value,
            initialValue: data.initialValue
        });
    }

    return (
        <MultirangeSlider
            min={min}
            max={max}
            step={step}
            values={[value]}
            trackColor={trackColor}
            onInput={handleInput}
            onChange={handleChange}
        />
    );
};

const Track = {};
