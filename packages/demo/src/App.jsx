import React from 'react';
import { Container, Header, Item, Tab } from 'semantic-ui-react';

import { SimpleSlider, MultirangeSlider } from 'semantic-ui-react-multirange-slider';


function handleEvent(event, data) {
    console.log(event.type, data);
}


const SimpleSliderExamples = () => (
    <Item.Group>
        <Item>
            <Item.Content>
                <Item.Header>Simple Slider</Item.Header>
                <Item.Meta>Slider without options</Item.Meta>
                <Item.Description>
                    <SimpleSlider
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
                <Item.Meta>Slider with value of '40'</Item.Meta>
                <Item.Description>
                    <SimpleSlider
                        value={40}
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
                <Item.Meta>Slider with step size of '20'</Item.Meta>
                <Item.Description>
                    <SimpleSlider
                        step={20}
                        value={20}
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
            </Item.Content>
        </Item>
        <Item>
            <Item.Content>
                <Item.Header>Track Colors</Item.Header>
                <Item.Meta>Slider with blue track</Item.Meta>
                <Item.Description>
                    <SimpleSlider
                        value={40}
                        trackColor='blue'
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
                <Item.Meta>Slider with red track</Item.Meta>
                <Item.Description>
                    <SimpleSlider
                        value={60}
                        trackColor='red'
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
            </Item.Content>
        </Item>
    </Item.Group>
);

const MultirangeSliderExamples = () => (
    <Item.Group>
        <Item>
            <Item.Content>
                <Item.Header>Simple Range Slider</Item.Header>
                <Item.Meta>Range slider with two thumbs</Item.Meta>
                <Item.Description>
                    <MultirangeSlider
                        values={[20, 60]}
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
                <Item.Meta>Range slider with step size of '10'</Item.Meta>
                <Item.Description>
                    <MultirangeSlider
                        step={10}
                        values={[10, 70]}
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
            </Item.Content>
        </Item>
        <Item>
            <Item.Content>
                <Item.Header>Multirange Slider</Item.Header>
                <Item.Meta>Multirange slider with four thumbs</Item.Meta>
                <Item.Description>
                    <MultirangeSlider
                        values={[10, 30, 50, 80]}
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
                <Item.Meta>Multirange slider with three thumbs and step size of '5'</Item.Meta>
                <Item.Description>
                    <MultirangeSlider
                        step={5}
                        values={[20, 60, 90]}
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
            </Item.Content>
        </Item>
        <Item>
            <Item.Content>
                <Item.Header>Track Colors</Item.Header>
                <Item.Meta>Multirange slider with two thumbs and orange track</Item.Meta>
                <Item.Description>
                    <MultirangeSlider
                        values={[20, 60]}
                        trackColor='orange'
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
                <Item.Meta>Multirange slider with multiple thumbs and green track</Item.Meta>
                <Item.Description>
                    <MultirangeSlider
                        values={[10, 40, 80]}
                        trackColor='green'
                        onInput={handleEvent}
                        onChange={handleEvent}
                    />
                </Item.Description>
            </Item.Content>
        </Item>
    </Item.Group>
);

const panes = [
    { menuItem: 'SimpleSlider', render: () => <SimpleSliderExamples /> },
    { menuItem: 'MultirangeSlider', render: () => <MultirangeSliderExamples /> }
];

export default () => (
    <Container text>
        <Header as='h1'>Semantic UI React Multirange Slider</Header>
        <Tab panes={panes} />
    </Container>
);
