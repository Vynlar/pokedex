import * as React from 'react';
import styled from '@emotion/styled';
import { theme } from './config';


export const Container = styled.div`
    padding: 48px;
    padding-top: 0;
    background: ${theme.colors.brand};
    min-height: 100vh;

    @media min-width(720px) {

    }
`;

export const Content = styled.div`
    max-width: 1280px;
    margin: auto;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    padding-top: 40px;
`;

export const Loading = styled.div`
    border-radius: 5px;
    width: 100%;
    height: 100%;
    min-height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 0.2s;
    transition-delay: 0.25s;
    opacity: ${(props: { visible: boolean }) => props.visible ? 1 : 0};
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 48px;
    z-index: 10;
`;

export const EmptyState = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    font-weight: bold;
    color: white;
`;