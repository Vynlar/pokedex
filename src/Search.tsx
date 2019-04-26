import * as React from 'react';
import styled from '@emotion/styled';
import { theme } from './config';

type Props = {
    value: string,
    onChange: React.ChangeEventHandler,
    placeholder?: string,
};

const Field = styled.input`
    height: 96px;
    background: rgba(0,0,0,0.08);
    border: none;
    border-radius: 7px;
    max-width: 60%;
    width: 100%;
    padding: 0 10%;
    font-size: 72px;
    color: white;
    font-weight: bold;
    outline: none;
    border: 3px solid rgba(255, 255, 255, 0);
    
    &:focus {
        border: 3px solid rgba(255, 255, 255, 0.04);
    }

    &::placeholder {
        color: rgba(0,0,0,0.16);
    }
`;

export default function Search(props: Props) {
    return (
        <Field placeholder={props.placeholder || "Pokédex"} value={props.value} onChange={props.onChange} />
    );
}