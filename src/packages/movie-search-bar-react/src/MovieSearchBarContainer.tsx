import { Icon, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {SearchMinor} from '@shopify/polaris-icons';
import { Card } from "../../card-react";

const options = [
    {value: "test1", label: "Test 1"},
    {value: "test2", label: "Test 2"},
    {value: "test3", label: "Test 3"},
    {value: "test4", label: "Test 4"},
]

const Component = styled(Card)`
    width: 100%;
    padding: 1rem 1rem;
    padding-bottom: 2rem;
`;

type MovieSearchBarContainerProps = { 
    generateSearchResults: (searchString: string) => void;
    className?: string;
};

export const MovieSearchBarContainer = ({generateSearchResults, className}: MovieSearchBarContainerProps) => {
    const [searchString, setSearchString] = useState("");    
    
    const updateSearchString = useCallback((value: string | any) => {
        setSearchString(value);
        generateSearchResults(value);
    }, [options]);

    return (
        <Component className={className}>
            <TextField
                label="Movie Title"
                onChange={updateSearchString}
                value={searchString}
                prefix={<Icon source={SearchMinor} color="base" />}
            />
        </Component>
    );
}