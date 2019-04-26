import * as React from 'react';
import { RouteComponentProps, withRouter, BrowserRouterProps } from 'react-router-dom';
import styled from '@emotion/styled';

import config, { theme } from './config';
import { Pokemon, PokemonType } from './pokemon';

import Button from './Button';
import Card, { CardHeader, CardBody, CardContainer } from './Card';
import Search from './Search';
import Pill from './Pill';
import { fetchPokemon } from './request';

type Props = RouteComponentProps<RouteParams> & BrowserRouterProps;

type RouteParams = {
    page?: string,
}

type State = {
    pokemon: Pokemon[],
    pagination: {
        perPage: number,
        total: number,
    },
    search: string,
}

const PokemonPhoto = styled.img`
    height: 120px;
    object-fit: contain;
`;

const PillContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: calc(100% - 2*20px);
    margin: 20px;
`;

const Container = styled.div`
    padding: 48px;
    padding-top: 0;
    background: ${theme.colors.brand};
    min-height: 100vh;
`;

const Content = styled.div`
    max-width: 1280px;
    margin: auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    padding-top: 40px;
`;

const EmptyState = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    font-weight: bold;
    color: white;
`;

export class Pokedex extends React.Component<Props, State> {
    state: State = {
        pokemon: [],
        pagination: {
            perPage: 15,
            total: 15,
        },
        search: "",
    }

    componentDidUpdate(prevProps: Props) {
        if(prevProps.match.params.page !== this.props.match.params.page) {
            this.loadPokemon(this.state.search);
        }
    }

    componentDidMount() {
        this.loadPokemon("");
    }

    private currentPage(): number {
        const page = parseInt(this.props.match.params.page) || 1;
        return page;
    }

    private totalPages(): number {
        return Math.ceil(this.state.pagination.total / this.state.pagination.perPage);
    }

    private hasNextPage(): boolean {
        if(this.totalPages() === this.currentPage() || this.totalPages() === 0) return false;
        return true;
    }

    private hasPreviousPage(): boolean {
        return this.currentPage() !== 1;
    }

    async loadPokemon(search: string) {
        const data = await fetchPokemon(this.currentPage(), this.state.search);
        this.setState({
            pokemon: data.data,
            pagination: {
                perPage: data.meta.per_page,
                total: data.meta.total,
            }
        });
    }

    private searchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value,
        });
        this.loadPokemon(event.target.value);
        this.props.history.push(`/page/1`);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Button disabled={!this.hasPreviousPage()} to={`/page/${this.currentPage() - 1}`}></Button>
                        <Search onChange={this.searchChanged} value={this.state.search} />
                        <Button disabled={!this.hasNextPage()} to={`/page/${this.currentPage() + 1}`}></Button>
                    </Header>

                    <CardContainer>
                        {this.state.pokemon.length === 0 ? (
                            <EmptyState>
                                Aww Magikarp! We couldn't find any Pokémon by that name.
                            </EmptyState>
                        ) : null}
                        {this.state.pokemon.map((pokemon: Pokemon) =>
                            <Card key={pokemon.id}>
                                <CardHeader>
                                    {pokemon.name}
                                </CardHeader>
                                <CardBody>
                                    <PokemonPhoto src={pokemon.image} />
                                    <PillContainer>
                                        {pokemon.types.map(type => (
                                            <Pill key={type}>{type}</Pill>
                                        ))}
                                    </PillContainer>
                                </CardBody>
                            </Card>
                        )}
                    </CardContainer>
                </Content>
            </Container>
        );
    }
}

export default withRouter(Pokedex);