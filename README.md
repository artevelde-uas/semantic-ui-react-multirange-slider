# Semantic UI React Multirange Slider

[![npm](https://img.shields.io/npm/v/semantic-ui-react-multirange-slider.svg)](https://www.npmjs.com/package/semantic-ui-react-multirange-slider)
[![license](https://img.shields.io/github/license/artevelde-uas/semantic-ui-react-multirange-slider.svg)](https://spdx.org/licenses/ISC)
[![downloads](https://img.shields.io/npm/dt/semantic-ui-react-multirange-slider.svg)](https://www.npmjs.com/package/semantic-ui-react-multirange-slider)

![Semantic UI logo](/docs/semantic-ui-logo.png)

Multirange slider control for [Semantic UI React](https://react.semantic-ui.com/)

## Prerequisites

```json
{
  "react": "*",
  "react-dom": "*",
  "semantic-ui-react": "*"
}
```

## Installation

Using NPM:

```shell
npm install semantic-ui-react-multirange-slider
```

or Yarn:

```shell
yarn add semantic-ui-react-multirange-slider
```

## Usage

### Simple Slider Example

Slider without options

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';
import 'semantic-ui-react-multirange-slider/dist/index.css';

export default () => (
    <MultirangeSlider
        onChange={console.log}
    />
);
```

### Range Slider Example

Slider with two thumbs

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';
import 'semantic-ui-react-multirange-slider/dist/index.css';

export default () => (
    <MultirangeSlider
        values={[0, 50]}
        onChange={console.log}
    />
);
```

### Multirange Slider Example

Slider with multiple thumbs and green track

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';
import 'semantic-ui-react-multirange-slider/dist/index.css';

export default () => (
    <MultirangeSlider
        min={20}
        max={150}
        values={[30, 50, 90, 120]}
        trackColor='green'
        onChange={console.log}
    />
);
```

## Demo

Clone the package and run `yarn start`

## API

<a name="module_MultirangeSlider"></a>

### MultirangeSlider

A MultirangeSlider is used to modify multiple values inside a given range

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>0</code> | The minimum possible value |
| [max] | <code>number</code> | <code>100</code> | The maximum possible value |
| [values] | <code>Array.<number></code> |  | An array holding all the values |
| [trackColor] | <code>string</code> | <code>"'blue'"</code> | The color of the track segments |
| [onChange] | <code>function</code> |  | Called when the values change |

