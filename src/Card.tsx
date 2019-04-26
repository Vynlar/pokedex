import styled from '@emotion/styled';
import { theme } from './config';

const Card = styled.div`
    min-width: 220px;
    max-width: 33%;
    background: white;
    flex: 1;
    margin: 8px;
    border-radius: 2px;
`;

export const CardHeader = styled.div`
    padding: 17px 24px;
    border-bottom: 1px solid ${theme.colors.greyLightest};
    font-weight: bold;
    font-size: 16px;
`;

export const CardBody = styled.div`
    display: flex;
    justify-content: center;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
`;

export default Card;