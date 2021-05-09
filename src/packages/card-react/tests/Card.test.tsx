import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import testIds from './testIds';
import { Card } from '../src';

const getStyle = (ele: HTMLElement) => {
    const component = document.getElementsByClassName(ele.className);
    return getComputedStyle(component[0]);
};

const width = "30rem";
const height = "25rem";

const childrenTestId = "card-react-test-children";

describe("Card", () => {
    test("Make sure it renders", () => {
        const { queryByTestId } = render(
            <Card></Card>
        );

        const card = queryByTestId(testIds.component);
        expect(card).not.toBeNull();
    });

    test("Make sure it renders children", async () => {
        const { queryByTestId } = render(
            <Card>
                {
                <div data-testid={childrenTestId}>
                </div>
                }
            </Card>
        );
        const children = queryByTestId(childrenTestId);
        expect(children).not.toBeNull();
    });

    // test("When Dot Clicked Slides Move", async () => {
    //     const { queryByTestId } = render(
    //         <Carousel width={width} height={height}>
    //             {fakeSlides}
    //         </Carousel>
    //     );

    //     const dot = queryByTestId(testIds.dot + 1);
    //     fireEvent.click(dot);

    //     checkTransformValue(1, queryByTestId, "When Dot Clicked Slides Move")
    // })
})