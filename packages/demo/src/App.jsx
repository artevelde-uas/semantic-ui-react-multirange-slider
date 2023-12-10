import React from 'react';
import { Container, Header, Item } from 'semantic-ui-react';
import { SimpleSlider, MultirangeSlider } from 'semantic-ui-react-multirange-slider';


function handleEvent(event, data) {
    console.log(event.type, data);
}


export default () => (
    <Container text>
        <Header as='h1'>Semantic UI React Multirange Slider</Header>
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header>Simple Slider</Item.Header>
                    <Item.Meta>Slider without options</Item.Meta>
                    <Item.Description>
                        <SimpleSlider
                            step={0.2}
                            min={0}
                            max={1}
                            value={0.5}
                            onInput={handleEvent}
                            onChange={handleEvent}
                        />
                    </Item.Description>
                    <Item.Meta>Slider without options</Item.Meta>
                    <Item.Description>
                        <MultirangeSlider
                            onInput={handleEvent}
                            onChange={handleEvent}
                        />
                    </Item.Description>
                    <Item.Meta>Slider with step size of 20</Item.Meta>
                    <Item.Description>
                        <MultirangeSlider
                            step={20}
                            onInput={handleEvent}
                            onChange={handleEvent}
                        />
                    </Item.Description>
                </Item.Content>
            </Item>
            <Item>
                <Item.Content>
                    <Item.Header>Range Slider</Item.Header>
                    <Item.Meta>Slider with two thumbs</Item.Meta>
                    <Item.Description>
                        <MultirangeSlider
                            values={[0, 50]}
                            onInput={handleEvent}
                            onChange={handleEvent}
                        />
                    </Item.Description>
                </Item.Content>
            </Item>
            <Item>
                <Item.Content>
                    <Item.Header>Multirange Slider</Item.Header>
                    <Item.Meta>Slider with multiple thumbs and green track</Item.Meta>
                    <Item.Description>
                        <MultirangeSlider
                            min={20}
                            max={150}
                            values={[30, 50, 90, 120]}
                            trackColor='green'
                            onInput={handleEvent}
                            onChange={handleEvent}
                        />
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    </Container>
);
