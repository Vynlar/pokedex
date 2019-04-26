import * as React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type Props = {
    value: string,
    onChange: React.ChangeEventHandler,
    placeholder?: string,
};

const Container = styled.div`
    position: relative;
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

    &:focus {
        border: 3px solid rgba(255, 255, 255, 0.04);
    }

    &::placeholder {
        color: rgba(0,0,0,0.16);
    }
`;

const Icon = styled(FontAwesomeIcon)`
    color: white;
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export default function Search(props: Props) {
    return (
        <Container>
            <Field placeholder={props.placeholder || "Pokédex"} value={props.value} onChange={props.onChange} />
            <Icon icon={faSearch} />
        </Container>
    );
}
