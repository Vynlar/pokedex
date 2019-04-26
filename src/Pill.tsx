import * as React from 'react';
import styled from '@emotion/styled';
import { TinyColor } from '@ctrl/tinycolor';

import { PokemonType } from './pokemon';

type Props = {
    children: PokemonType,
};
const black = new TinyColor('black').lighten(20).toRgbString();
const brown = new TinyColor('brown').darken(20).toRgbString();
function typeToColor(type: PokemonType): string {
    switch (type) {
        case "bug":
        return "green";

        case "dragon":
        return "#ae9962";

        case "electric":
        return new TinyColor("yellow").darken(30).toRgbString();

        case "fighting":
        return brown;

        case "fire":
        return "red";

        case "flying":
        return black;

        case "ghost":
        return "purple";

        case "grass":
        return "green";

        case "ground":
        return brown;

        case "ice":
        return "blue";

        case "normal":
        return black;

        case "poison":
        return "purple";

        case "psychic":
        return "purple";

        case "rock":
        return brown;

        case "water":
        return "blue";

        case "fairy":
        return new TinyColor("rgb(255, 89, 241)").darken(20).toRgbString();
    }
    return black;
}

const Container = styled.div`
    border: 1px solid;
    border-color: ${(props: {type: PokemonType}) => typeToColor(props.type)};
    color: ${(props: {type: PokemonType}) => typeToColor(props.type)};
    background: ${(props: {type: PokemonType}) => 
        new TinyColor(typeToColor(props.type)).brighten(50).lighten(20).toString()
    };
    text-transform: uppercase;
    display: flex;
    justyfy-content: center;
    align-items: center;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 3px;
    margin-left: 8px;
    line-height: 1em;
`;

export default function Pill(props: Props) {
    return (
        <Container type={props.children}>
            {props.children}
        </Container>
    );
};
