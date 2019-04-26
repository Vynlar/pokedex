import * as React from 'react';
import styled from '@emotion/styled';

type Props = {
    value: string,
    onChange: React.ChangeEventHandler
};

const Field = styled.input`
`;

export default function Search(props: Props) {
    return (
        <Field value={props.value} onChange={props.onChange} />
    );
}