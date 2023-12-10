import React, { Fragment } from 'react';
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
 * @param {string} [trackColor='blue'] - The color of the track segments
 * @param {function} [onChange] - Called when the values change
 */
export default ({
    min = 0,
    max = 100,
    step = 1,
    values = [0],
    trackColor = 'black',
    onChange
}) => {
    let currentThumb;
    let offsetLeft;

    function handleMouseDown(event) {
        // Only handle mouse down event on thumbs
        if (!event.target.matches(`.ui.${styles.slider} .${styles.thumb}`)) return;

        // Store current thumb and offset
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

        currentThumb.value = rounded;
        currentThumb.style.left = `${thumbLeft}%`;
        currentThumb.previousElementSibling.style.right = `${trackRight}%`;
        currentThumb.nextElementSibling.style.left = `${thumbLeft}%`;

        event.preventDefault();
    }

    function handleMouseUp(event) {
        const thumbs = Array.from(currentThumb.parentElement.getElementsByClassName(styles.thumb));
        const values = thumbs.map(thumb => Number(thumb.value));

        onChange && onChange(values);

        event.preventDefault();
    }

    return (
        <div
            className={`ui ${styles.slider}`}
            onMouseDown={handleMouseDown}
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
