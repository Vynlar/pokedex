import styled from '@emotion/styled';
import { theme } from './config';

const Card = styled.div`
    min-width: 220px;
    background: white;
    flex: 1;
    margin: 8px;
    border-radius: 2px;
    transition: transform 0.1s, box-shadow 0.1s;
    cursor: pointer;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    }
`;

export const CardHeader = styled.div`
    padding: 17px 24px;
    border-bottom: 1px solid ${theme.colors.greyLightest};
    font-weight: bold;
    font-size: 16px;
`;

export const CardBody = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const CardContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
`;

export default Card;