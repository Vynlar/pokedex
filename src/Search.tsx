import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
    value: string,
    onChange: React.ChangeEventHandler,
    placeholder?: string,
    onClear: () => void,
};

const Container = styled.div`
    position: relative;
    margin: 0 16px;

    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
    }
`;

const Field = styled.input`
    height: 96px;
    background: rgba(0,0,0,0.08);
    border: none;
    border-radius: 7px;
    max-width: 500px;
    width: 100%;
    padding-left: 100px;
    font-size: 72px;
    color: white;
    font-weight: bold;
    outline: none;
    border: 3px solid rgba(255, 255, 255, 0);
    transition: max-width 0.2s;

    &:focus {
        border: 3px solid rgba(255, 255, 255, 0.04);
        max-width: 700px;
    }

    &::placeholder {
        color: rgba(0,0,0,0.16);
    }

    @media (max-width: 768px) {
        height: 48px;
        font-size: 18px;
        padding-left: 30px;
        border-radius: 8px;

        &::placeholder {
            color: rgba(255,255,255,0.30);
        }
    }
`;

const iconStyles = css`
    color: white;
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translate(50%, -50%);
`;

const SearchIcon = styled(FontAwesomeIcon)`
    ${iconStyles};

    @media (max-width: 768px) {
        left: 2px;
    }
`;

const Clear = styled(FontAwesomeIcon)`
    ${iconStyles};
    right: 50px;
    left: auto;
    cursor: pointer;
`;

export default function Search(props: Props) {
    return (
        <Container>
            <Field placeholder={props.placeholder || "Pokédex"} value={props.value} onChange={props.onChange} />
            <SearchIcon icon={faSearch} />
            {props.value !== "" ? <Clear icon={faTimesCircle} onMouseDown={props.onClear} /> : null}
        </Container>
    );
}
