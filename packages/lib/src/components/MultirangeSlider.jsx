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
    const valuesRef = useRef(Array.from(values));

    let currentIndex;
    let currentThumb = null;
    let offsetLeft;

    function handleMouseDown(event, index) {
        // Only handle mouse down event on thumbs
        if (!event.target.matches(`.ui.${styles.slider} .${styles.thumb}`)) return;

        // Store current index, thumb and offset
        currentIndex = index;
        currentThumb = event.target;
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
        const previousThumb = currentThumb.previousElementSibling.previousElementSibling;
        const nextThumb = currentThumb.nextElementSibling.nextElementSibling;
        const trackWidth = parseFloat(getComputedStyle(currentThumb.parentElement).width);
        const lowerBoundary = previousThumb ? parseFloat(getComputedStyle(previousThumb).left) : 0;
        const upperBoundary = nextThumb ? parseFloat(getComputedStyle(nextThumb).left) : trackWidth;
        const stepWidth = trackWidth / ((max - min) / step);
        const left = Math.max(lowerBoundary, Math.min(upperBoundary, (event.clientX + offsetLeft)));
        const leftRounded = Math.round(left / stepWidth) * stepWidth;
        const thumbLeft = (leftRounded / trackWidth) * 100;
        const trackRight = 100 - thumbLeft;
        const value = (min + ((left / trackWidth) * (max - min)));
        const rounded = Math.round((Math.round(value / step) * step) * 1e10) / 1e10;
        const previousValue = valuesRef.current[currentIndex];

        currentThumb.value = rounded;
        currentThumb.style.left = `${thumbLeft}%`;
        currentThumb.previousElementSibling.style.right = `${trackRight}%`;
        currentThumb.nextElementSibling.style.left = `${thumbLeft}%`;

        if (rounded !== previousValue) {
            // Store the new value
            valuesRef.current[currentIndex] = rounded;

            // Create an `input` event
            const event = new Event('input', { bubbles: true });

            // Set the event data
            event.data = {
                index: currentIndex,
                value: rounded,
                previousValue,
                initialValue: values[currentIndex]
            };

            // Fire the event on the slider element
            sliderRef.current.dispatchEvent(event);
        }

        event.preventDefault();
    }

    function handleMouseUp(event) {
        // Reset the current thumb
        currentThumb = null;

        if (valuesRef.current[currentIndex] !== values[currentIndex]) {
            const event = new Event('input', { bubbles: true });

            event.data = {
                index: currentIndex,
                value: valuesRef.current[currentIndex],
                initialValue: values[currentIndex],
                values: valuesRef.current
            };

            sliderRef.current.dispatchEvent(event);
        }

        event.preventDefault();
    }

    function handleInput(event) {
        if (currentThumb === null) {
            // Change synthetic event type
            event._reactName = 'onChange';
            event.type = 'change';

            // Fire the change event if set
            onChange && onChange(event, event.nativeEvent.data);
        } else {
            onInput && onInput(event, event.nativeEvent.data);
        }
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
                    const thumbLeft = ((value - min) / (max - min)) * 100;
                    const trackLeft = (((values[index - 1] ?? min) - min) / (max - min)) * 100;
                    const trackRight = 100 - thumbLeft;
                    const trackClass = classNames(
                        styles.segment,
                        { [trackColor]: ((values.length === 1) || (index > 0)) }
                    );

                    return (
                        <Fragment key={index}>
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
