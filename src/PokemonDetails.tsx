import * as React from 'react';
import { css } from '@emotion/core';
import { Container, Content, Header, Loading, hideOnMobile } from './Layout';
import { DetailedPokemon, Stat, statToString } from './pokemon';
import { fetchPokemonById } from './request';
import { TinyColor } from '@ctrl/tinycolor';
import { RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouterProps } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CardHeader, CardBody } from './Card';
import Pill from './Pill';
import { theme } from './config';

type RouteParams = {
    pokemonId?: string,
}

interface Props extends RouteComponentProps<RouteParams>, BrowserRouterProps {}

interface State {
    pokemon?: DetailedPokemon,
    loading: boolean
}

const Title = styled.div`
    font-weight: bold;
    font-size: 8vmin;
    color: white;

    span {
        margin-left: 10px;
        opacity: 0.8;
        display: none;
    }

    @media (max-width: 425px) {
        font-size: 18px;
        margin-right: auto;
        margin-left: 8px;

        span {
            display: inline;
        }
    }
`;

const DesktopName = styled.div`
    ${hideOnMobile};
`;

const Panel = styled.div`
    background: white;
    border-radius: 2px;
    width: 100%;
    max-width: 664px;
    margin: auto;
`;

const Table = styled.div`
    width: 100%;
    flex: 1;
    min-width: 150px;

    td {
        padding: 8px;

        &:first-child {
            font-weight: bold;
            width: 120px;
        }
    }
`;

const HeaderBar = styled.div`
    width: 100%;
    background: ${theme.colors.brand};
    height: 32px;
    padding: 8px 16px;
    font-weight: bold;
    color: white;
    margin-top: 32px;
    margin-bottom: 16px;
`;

const Photo = styled.img`
    flex: 1;
    object-fit: contain;
    height: 130px;
    min-width: 150px;

    @media (max-width: 425px) {
        position: absolute;
        top: 24px;
        right: 0;
    }
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Types = styled.div`
    display: flex;

    @media (min-width: 426px) {
        margin-left: auto;
    }
`;

const StatBlock = styled.ul`
    list-style: none;
    padding: 0;
    flex: 1;

    li {
    }
`;

const StatRow = styled.div`
    display: flex;
    margin-bottom: 3px;
    min-width: 80px;

    span {
        min-width: 65px;
    }
    
    .bar {
        width: 100%;
        max-width: 188px;
        height: 18px;
        background: ${new TinyColor(theme.colors.brand).lighten(30).toHexString()};
        position: relative;
        color: white;
        padding-left: 5px;
        z-index: 1;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: ${theme.colors.brand};
            transform-origin: 0 0;
            transform: scaleX(${(props: { alpha: number }) => props.alpha});
            z-index: -1;
        }
    }
`;

export class PokemonDetails extends React.Component<Props, State> {
    state: State = {
        loading: true,
    }

    componentDidMount() {
        const pokemonId: number = parseInt(this.props.match.params.pokemonId);
        console.log();
        if(isNaN(pokemonId)) {
            this.props.history.push("/");
        } else {
            this.loadPokemon(pokemonId);
        }
    }

    private async loadPokemon(id: number) {
        const pokemon = await fetchPokemonById(id);
        this.setState({
            pokemon,
            loading: false,
        });
    }

    private formatList(values: string[]) {
        return values.map(group =>
            group.charAt(0).toUpperCase() + group.slice(1)
        ).join(", ")
    }

    renderDetails(pokemon: DetailedPokemon) {
        // Cast to type Stat[] because we know the request body will only have the values found in the Stat type.
        const allStats: Stat[] = Object.keys(pokemon.stats) as Stat[];
        const allStatValues: number[] = Object.keys(pokemon.stats).map((stat: Stat) => pokemon.stats[stat]);
        const maxStat = Math.max(...allStatValues);
        return (
            <div>
                <CardHeader>
                    <DesktopName>
                        {pokemon.name}<span>#{pokemon.id}</span>
                    </DesktopName>
                    <Types>
                        {pokemon.types.map(type => (
                            <Pill>{type}</Pill>
                        ))}
                    </Types>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Photo src={pokemon.image} />
                        <StatBlock>
                            {allStats.map((stat: Stat) => (
                                <StatRow alpha={pokemon.stats[stat] / maxStat}>
                                    <span>{statToString(stat)}</span>
                                    <div className="bar">{pokemon.stats[stat]}</div>
                                </StatRow>
                            ))}
                        </StatBlock>
                    </Row>
                    <Row>
                        {pokemon.description}
                    </Row>
                    <HeaderBar>Profile</HeaderBar>
                    <Row>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Height:</td>
                                    <td>{pokemon.height} m</td>
                                </tr>
                                <tr>
                                    <td>Egg Groups:</td>
                                    <td>
                                        {this.formatList(pokemon.eggGroups)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Weight:</td>
                                    <td>{pokemon.weight} kg</td>
                                </tr>
                                <tr>
                                    <td>Abilities: </td>
                                    <td>
                                        {this.formatList(pokemon.abilities)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </CardBody>
            </div>
        );
    }

    render () {
        return (
            <Container>
                <Content>
                    <Header>
                        <Button to='/'>
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                        </Button>
                        <Title>{this.state.pokemon ? (
                            <>
                                {this.state.pokemon.name}
                                <span>#{this.state.pokemon.id}</span>
                            </>
                        ) : null}</Title>
                        <Button disabled></Button>
                    </Header>

                    <Loading visible={this.state.loading}>
                        Loading...
                    </Loading>
                    <Panel>
                        {this.state.pokemon ? (
                            this.renderDetails(this.state.pokemon)
                        ) : null}
                    </Panel>
                </Content>
            </Container>
        );
    }
}

export default withRouter(PokemonDetails);