import React, { Fragment } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';
import MultirangeSlider from './MultirangeSlider';


/**
 * @module MultirangeSlider
 * 
 * @description A MultirangeSlider is used to modify multiple values inside a given range
 * 
 * @param {number} [min=0] - The minimum possible value
 * @param {number} [max=100] - The maximum possible value
 * @param {number} [step=1] - The step value
 * @param {number} [value] - The value of the slider
 * @param {string} [trackColor='blue'] - The color of the track segments
 * @param {function} [onChange] - Called when the values change
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
