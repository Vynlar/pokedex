import * as React from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { Link } from 'react-router-dom';

const active = css`
    cursor: pointer;
    visibility: visible;
    transition: transform 0.1s, filter 0.1s;

    &:hover {
        transform: scale(1.03);
        filter: brightness(1.1);
    }

    &:active {
        transform: scale(0.98);
        filter: brightness(0.8);
    }

`;

type ContainerProps = {
    disabled?: boolean,
};

const Container = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    background: rgba(0,0,0,0.08);
    cursor: not-allowed;
    visibility: hidden;
    ${(props: ContainerProps) => props.disabled ? null : active};

    @media (max-width: 768px) {
        background: none;
        width: 32px;
        height: 32px;
        font-size: 20px;
    }
`;

type Props = {
    children?: React.ReactNode | string,
    disabled?: boolean,
    onClick?: () => any,
    to?: string,
};

export default function Button(props: Props) {
    const inside = (
        <Container disabled={props.disabled} onClick={props.disabled ? () => {} : props.onClick}>
            { props.children }
        </Container>
    )
    if(props.to && !props.disabled) {
        return (
            <Link to={props.to}>
                {inside}
            </Link>
        );
    }
    return inside;
}