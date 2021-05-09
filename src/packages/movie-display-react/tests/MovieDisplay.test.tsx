import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import testIds from './testIds';
import { MovieDisplay } from '../src';

const getStyle = (ele: HTMLElement) => {
    const component = document.getElementsByClassName(ele.className);
    return getComputedStyle(component[0]);
};

const width = "30rem";
const height = "25rem";

const childrenTestId = "movie-display-test-children";

describe("MovieDisplay", () => {
    test("Make sure it renders", () => {
        const { queryByTestId } = render(
            <MovieDisplay imdbID={""} Year={""} Title={""} />
        );

        const component = queryByTestId(testIds.component);
        expect(component).not.toBeNull();
    });

    test("Make sure it renders children", async () => {
        const { queryByTestId } = render(
            <MovieDisplay imdbID={""} Year={""} Title={""}>
                {
                <div data-testid={childrenTestId}>
                </div>
                }
            </MovieDisplay>
        );
        const children = queryByTestId(childrenTestId);
        expect(children).not.toBeNull();
    });
})