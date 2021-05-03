import React from "react";
import styled from "styled-components";

const Component = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 2rem;
`;

const Dot = styled.div`
    border-radius: 50%;
    background-color: black;
    width: 4px;
    height: 4px;
    margin: auto 0;
    margin-right: 2rem;
`;

const MovieTitleAndTitle = styled.p`
    margin: auto 0;
    margin-right: 2rem;
`;

export type MovieData = {
    Title: string;
    Year: string;
    imdbID: string;
}

type MovieDisplayProps = MovieData & { 
    children?: React.ReactNode;
    className?: string;
};

// TODO when title is too long it looks bad
export const MovieDisplay = ({Title, children, Year, className}: MovieDisplayProps) => {

    return (
        <Component className={className}>
            <Dot />
            <MovieTitleAndTitle>{`${Title} (${Year})`}</MovieTitleAndTitle>
            {children}
        </Component>
    );
}