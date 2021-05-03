import { Button, Heading } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";
import { Card } from "../../card-react";
import { MovieDisplay } from "../../movie-display-react";

const Component = styled(Card)``;

const StyledMovieDisplay = styled(MovieDisplay)`
    margin-bottom: 1rem;
`;

export type ResultType = {
    Title: string;
    Year: string;
    imdbID: string;
    nominated: boolean;
};

type ResultsDisplayProps = { 
    className?: string;
    results: ResultType[];
    searchString: string;
    nominateFilm: (filmId: string) => void;
    loading: boolean;
};

export const SearchResultsDisplay = ({className, results, nominateFilm, searchString, loading}: ResultsDisplayProps) => {
    return (
        <Component className={className}>
            <Heading>Results for "{searchString}"</Heading>
            {
                !loading ? 
                results && results.map(({imdbID, Title, Year, nominated}) => 
                    <StyledMovieDisplay key={imdbID} imdbID={imdbID} Title={Title} Year={Year}>
                        <Button onClick={() => nominateFilm(imdbID)} disabled={nominated} size={"slim"}>Nominate</Button>
                    </StyledMovieDisplay>
                ) : "loading"
            }
        </Component>
    );
}