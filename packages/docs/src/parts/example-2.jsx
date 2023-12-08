import MultirangeSlider from 'semantic-ui-react-multirange-slider';
import 'semantic-ui-react-multirange-slider/dist/index.css';

export default () => (
    <MultirangeSlider
        values={[0, 50]}
        onChange={console.log}
    />
);