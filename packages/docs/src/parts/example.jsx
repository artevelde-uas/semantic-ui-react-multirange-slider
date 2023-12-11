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
