import * as React from 'react';
import styled from '@emotion/styled';
import { PokemonType } from './Pokedex';

type Props = {
    children: PokemonType,
};

function typeToColor(type: PokemonType) {
    return "black";
}

const Container = styled.div`
  border: 1px solid;
  border-color: ${(props: {type: PokemonType}) => typeToColor(props.type)};
  color: ${(props: {type: PokemonType}) => typeToColor(props.type)};
  text-transform: uppercase;
  display: flex;
  justyfy-content: center;
  align-items: center;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 3px;
  margin-left: 8px;
`;

export default function Pill(props: Props) {
    return (
        <Container type={props.children}>
            {props.children}
        </Container>
    );
};
