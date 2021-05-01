import { Heading } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";
import { Card } from "../../card-react";
import { ResultDisplay } from '.';

const Component = styled(Card)``;

export type ResultType = {
    title: string;
    year: string;
    id: string;
    nominated: boolean;
};

type ResultsDisplayProps = { 
    className?: string;
    results: ResultType[];
    nominateFilm: (filmId: string) => void;
};

export const ResultsDisplay = ({className, results, nominateFilm}: ResultsDisplayProps) => {
    return (
        <Component className={className}>
            <Heading>Results</Heading>
            {
                results.map(result => 
                    <ResultDisplay nominateFilm={nominateFilm} key={result.id} {...result} />
                )
            }
        </Component>
    );
}