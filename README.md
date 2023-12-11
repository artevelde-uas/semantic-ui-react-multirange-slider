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

In your application root, first import the component styles:

```jsx
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react-multirange-slider/dist/styles.css';
```

Then import the slider component in your code:

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';

export default () => {

    // Continuesly fired while a value changes
    function handleInput(event, data) {
        /* `data` format:
            {
                index,         // -> The index of the changed thumb
                value,         // -> The current value of the changed thumb
                previousValue, // -> The previous value of the changed thumb
                initialValue   // -> The initial value of the changed thumb
            }
        */
    }

    // Fired after a value has changed
    function handleChange(event, data) {
        /* `data` format:
            {
                index,         // -> The index of the changed thumb
                value,         // -> The current value of the changed thumb
                initialValue   // -> The initial value of the changed thumb,
                values         // -> The current array of values
            }
        */
    }

    return (
        <MultirangeSlider
            min={20}
            max={150}
            step={10}
            values={[40, 70, 120]}
            trackColor='orange'
            onInput={handleInput}
            onChange={handleChange}
        />
    );
};
```

### Simple Slider Examples

#### Slider without options

![Example image of simple slider without options](/docs/example-simple-1.png)

```jsx
import { SimpleSlider } from 'semantic-ui-react-multirange-slider';

export default () => (
    <SimpleSlider />
);
```

#### Slider with two thumbs

![Example image of simple slider with value set](/docs/example-simple-2.png)

```jsx
import { SimpleSlider } from 'semantic-ui-react-multirange-slider';

export default () => (
    <SimpleSlider
        value={40}
    />
);
```

#### Slider with blue track

![Example image of simple slider with blue track](/docs/example-simple-3.png)

```jsx
import { SimpleSlider } from 'semantic-ui-react-multirange-slider';

export default () => (
    <SimpleSlider
        value={40}
        trackColor='blue'
    />
);
```

### Multirange Slider Example

#### Multirange slider with two thumbs

![Example image of multirange slider with two thumbs](/docs/example-multi-1.png)

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';

export default () => (
    <MultirangeSlider
        values={[20, 60]}
    />
);
```

#### Multirange slider with four thumbs

![Example image of multirange slider with four thumbs](/docs/example-multi-2.png)

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';

export default () => (
    <MultirangeSlider
        values={[10, 30, 50, 80]}
    />
);
```

#### Multirange slider with three thumbs and green track

![Example image of multirange slider with three thumbs and green track](/docs/example-multi-3.png)

```jsx
import { MultirangeSlider } from 'semantic-ui-react-multirange-slider';

export default () => (
    <MultirangeSlider
        values={[10, 40, 80]}
        trackColor='green'
    />
);
```

## Demo

Clone the package and run `yarn start`

## API

### Modules

<dl>
<dt><a href="#module_MultirangeSlider">MultirangeSlider</a></dt>
<dd><p>A MultirangeSlider is used to modify multiple values inside a given range</p>
</dd>
<dt><a href="#module_SimpleSlider">SimpleSlider</a></dt>
<dd><p>A SimpleSlider is used to modify a value inside a given range</p>
</dd>
</dl>

<a name="module_MultirangeSlider"></a>

### MultirangeSlider

A MultirangeSlider is used to modify multiple values inside a given range

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>0</code> | The minimum possible value |
| [max] | <code>number</code> | <code>100</code> | The maximum possible value |
| [step] | <code>number</code> | <code>1</code> | The step value |
| [values] | <code>Array.<number></code> | <code>[0]</code> | An array holding all the values |
| [trackColor] | <code>string</code> | <code>"black"</code> | The color of the track segments |
| [onInput] | <code>function</code> |  | Continuesly fired while a value changes |
| [onChange] | <code>function</code> |  | Fired after a value has changed |

<a name="module_SimpleSlider"></a>

### SimpleSlider

A SimpleSlider is used to modify a value inside a given range

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>0</code> | The minimum possible value |
| [max] | <code>number</code> | <code>100</code> | The maximum possible value |
| [step] | <code>number</code> | <code>1</code> | The step value |
| [value] | <code>number</code> | <code>0</code> | The value of the slider |
| [trackColor] | <code>string</code> | <code>"black"</code> | The color of the track |
| [onInput] | <code>function</code> |  | Continuesly fired while the value changes |
| [onChange] | <code>function</code> |  | Fired after the value has changed |

