import { Button, Heading } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";
import { Card } from "../../card-react";
import { MovieData, MovieDisplay } from "../../movie-display-react";

const Component = styled(Card)`
    background-color: white;
    padding: 2.5% 4%;
    height: fit-content;
`;

type NominationsDisplayProps = { 
    className?: string;
    nominations: MovieData[];
    removeNomination: (filmId: string) => void;
};

export const NominationsDisplay = ({className, nominations, removeNomination}: NominationsDisplayProps) => {
    return (
        <Component className={className}>
            <Heading>Nominations</Heading>
            {
                nominations.map(nomination => 
                    <MovieDisplay key={nomination.id} {...nomination}>
                        <Button onClick={() => removeNomination(nomination.id)} size={"slim"}>Remove</Button>
                    </MovieDisplay>
                )
            }
        </Component>
    );
}