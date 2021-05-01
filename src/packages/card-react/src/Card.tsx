import React from "react";
import styled from "styled-components";

const Component = styled.div`
    background-color: white;
    padding: 2.5% 4%;
    box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.1);
`;

type CardProps = {
    children?: React.ReactNode;
    className?: string;
};

export const Card = ({children, className}: CardProps) => {
    return (
        <Component className={className}>
            {children}
        </Component>
    );
}