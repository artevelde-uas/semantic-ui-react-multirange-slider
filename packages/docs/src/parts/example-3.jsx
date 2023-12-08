import MultirangeSlider from 'semantic-ui-react-multirange-slider';
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
