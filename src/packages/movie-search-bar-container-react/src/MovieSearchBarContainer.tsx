import { Autocomplete, Icon } from "@shopify/polaris";
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
`;

type MovieSearchBarContainerProps = { 
    generateSearchResults: (searchString: string) => void;
    className?: string;
};

export const MovieSearchBarContainer = ({generateSearchResults, className}: MovieSearchBarContainerProps) => {
    const [searchString, setSearchString] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const onSearch = () => generateSearchResults(searchString);

    const updateSearchString = useCallback((value: string | any) => {
        console.log(value);
        setSearchString(value);
    }, [options, loading]);

    const onSelect = useCallback((value: any) => {
        console.log(value);
    }, []);

    const textField = (
        <Autocomplete.TextField
          onChange={updateSearchString}
          label="Movie Title"
          value={searchString}
          prefix={<Icon source={SearchMinor} color="base" />}
          placeholder="Search"
        />
    );

    return (
        <Component className={className}>
            <Autocomplete
                options={options}
                selected={[]}
                onSelect={onSelect}
                textField={textField}
            />
        </Component>
    );
}