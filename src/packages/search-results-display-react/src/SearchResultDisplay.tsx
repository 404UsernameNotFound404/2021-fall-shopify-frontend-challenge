import { Button } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";
import { MovieDisplay } from "../../movie-display-react/src/MovieDisplay";
import {ResultType} from '.';

const Component = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 2rem;
`;

const StyledMovieDisplay = styled(MovieDisplay)`
    margin-bottom: 1rem;
`;

type ResultDisplayProps = ResultType & {
    nominateFilm: (filmId: string) => void;
};

export const ResultDisplay = ({title, nominated, nominateFilm, id, year}: ResultDisplayProps) => {

    const onNominate = () => {
        nominateFilm(id);
    }

    return (
        <Component>
            <StyledMovieDisplay id={id} title={title} year={year}>
                <Button onClick={onNominate} disabled={nominated} size={"slim"}>Nominate</Button>
            </StyledMovieDisplay>
        </Component>
    );
}