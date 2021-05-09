import React from "react";
import styled from "styled-components";

const Component = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15rem;
    padding: 1rem 0;
    border: 2px ${({theme}) => theme && theme.theme == "light" ? "green" : "#b5a135"} solid;
    border-radius: 1rem;
    background-color: ${({theme}) => theme && theme.primaryBackgroundColor};
`;

const Text = styled.p`
    color: ${({theme}) => theme && theme.primaryTextColor};
    margin: auto;
    text-align: center;
`;

type ThemeSwitchButtonProps = {
    switchTheme: () => void;    
};

export const ThemeSwitchButton = ({switchTheme}: ThemeSwitchButtonProps) => {
    return (
        <Component onClick={switchTheme}>
            <Text>switch theme</Text>
        </Component>
    );
}