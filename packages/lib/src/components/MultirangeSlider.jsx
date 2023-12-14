import React, { Fragment, useRef } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';


/**
 * @module MultirangeSlider
 * 
 * @description A MultirangeSlider is used to modify multiple values inside a given range
 * 
 * @param {number} [min=0] - The minimum possible value
 * @param {number} [max=100] - The maximum possible value
 * @param {number} [step=1] - The step value
 * @param {number[]} [values=[0]] - An array holding all the values
 * @param {string} [trackColor=black] - The color of the track segments
 * @param {function} [onInput] - Continuesly fired while a value changes
 * @param {function} [onChange] - Fired after a value has changed
 */
export default ({
    min = 0,
    max = 100,
    step = 1,
    values = [0],
    trackColor = 'black',
    onInput,
    onChange
}) => {
    const sliderRef = useRef();
    const valuesRef = useRef(values.map(Number));

    let currentIndex;
    let currentThumb = null;
    let startValue;
    let offsetLeft;

    function handleMouseDown(event, index) {
        // Only handle mouse down event on thumbs
        if (!event.target.matches(`.ui.${styles.slider} .${styles.thumb}`)) return;

        // Store current index, thumb, start and offset values
        currentIndex = index;
        currentThumb = event.target;
        startValue = Number(currentThumb.value);
        offsetLeft = currentThumb.offsetLeft - event.clientX;

        // Add mousemove event listener while mouse is down
        document.body.addEventListener('mousemove', handleMouseMove, { useCapture: true });

        // Add a one-time mouseup event listener to end the move
        document.body.addEventListener('mouseup', event => {
            // Remove mousemove event listener when mouse is released
            document.body.removeEventListener('mousemove', handleMouseMove, { useCapture: true });

            handleMouseUp(event);
        }, { once: true, useCapture: true });

        event.preventDefault();
    }

    function handleMouseMove(event) {
        // Get the adjacent thumbs
        const previousThumb = currentThumb.previousElementSibling.previousElementSibling;
        const nextThumb = currentThumb.nextElementSibling.nextElementSibling;

        // Calculate the width of the track
        const trackWidth = parseFloat(getComputedStyle(currentThumb.parentElement).width);

        // Calculate the lower and upper boundaries
        const lowerBoundary = previousThumb ? parseFloat(getComputedStyle(previousThumb).left) : 0;
        const upperBoundary = nextThumb ? parseFloat(getComputedStyle(nextThumb).left) : trackWidth;

        // Calculate the new values in pixels
        const left = Math.max(lowerBoundary, Math.min(upperBoundary, (event.clientX + offsetLeft)));
        const stepWidth = trackWidth / ((max - min) / step);
        const leftRounded = Math.round(left / stepWidth) * stepWidth;

        // Calculate the new offsets in percent
        const thumbLeft = (leftRounded / trackWidth) * 100;
        const trackRight = 100 - thumbLeft;

        // Calculate the actual new values
        const previousValue = valuesRef.current[currentIndex];
        const value = (min + ((left / trackWidth) * (max - min)));
        const rounded = Math.round((Math.round(value / step) * step) * 1e10) / 1e10;

        // Store the new values on the thumb element
        currentThumb.value = rounded;
        currentThumb.style.left = `${thumbLeft}%`;
        currentThumb.previousElementSibling.style.right = `${trackRight}%`;
        currentThumb.nextElementSibling.style.left = `${thumbLeft}%`;

        // If the value has changed...
        if (rounded !== previousValue) {
            // Store the new value
            valuesRef.current[currentIndex] = rounded;

            // Create an `input` event
            const event = new Event('input', { bubbles: true });

            // Set the event data
            event.data = {
                index: currentIndex,
                value: rounded,
                startValue,
                previousValue,
                initialValue: values[currentIndex]
            };

            // Fire the event on the slider element
            sliderRef.current.dispatchEvent(event);
        }

        event.preventDefault();
    }

    function handleMouseUp(event) {
        // Reset current index, thumb, start and offset values
        currentIndex = undefined;
        currentThumb = null;
        startValue = undefined;
        offsetLeft = undefined;

        // If the value has changed...
        if (valuesRef.current[currentIndex] !== startValue) {
            // Create an `input` event
            const event = new Event('input', { bubbles: true });

            // Set the event data
            event.data = {
                index: currentIndex,
                value: valuesRef.current[currentIndex],
                initialValue: values[currentIndex],
                values: valuesRef.current
            };

            // Fire the event on the slider element
            sliderRef.current.dispatchEvent(event);
        }

        event.preventDefault();
    }

    function handleInput(event) {
        // If no current thumb is set, we are still moving
        if (currentThumb !== null) {
            // Fire the 'input' event if set
            onInput && onInput(event, event.nativeEvent.data);

            return;
        }

        // Change synthetic event type
        event._reactName = 'onChange';
        event.type = 'change';

        // Fire the 'change' event if set
        onChange && onChange(event, event.nativeEvent.data);
    }

    return (
        <div
            ref={sliderRef}
            className={`ui ${styles.slider}`}
            onInput={handleInput}
        >
            <div
                className={styles.track}
            >
                {values.map((value, index, values) => {
                    const trackClass = classNames(
                        styles.segment,
                        // Add the track color
                        { [trackColor]: ((values.length === 1) || (index > 0)) }
                    );

                    // Calculate the thumb and track offsets in percent
                    const thumbLeft = ((value - min) / (max - min)) * 100;
                    const trackLeft = (((values[index - 1] ?? min) - min) / (max - min)) * 100;
                    const trackRight = 100 - thumbLeft;

                    return (
                        <Fragment key={index}>
                            {/* Render each track segment and thumb */}
                            <div
                                className={trackClass}
                                style={{
                                    left: `${trackLeft}%`,
                                    right: `${trackRight}%`
                                }}
                            />
                            <button
                                className={styles.thumb}
                                value={value}
                                style={{
                                    left: `${thumbLeft}%`
                                }}
                                onMouseDown={event => handleMouseDown(event, index)}
                            />
                            {/* Render the last track segment */}
                            {(index === values.length - 1) && (
                                <div
                                    className={styles.segment}
                                    style={{
                                        left: `${thumbLeft}%`,
                                        right: '0%'
                                    }}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const Track = {};
