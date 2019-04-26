import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import styled from '@emotion/styled';

import config, { theme } from './config';

import Button from './Button';
import Card, { CardHeader, CardBody, CardContainer } from './Card';
import Search from './Search';

type Props = RouteComponentProps<RouteParams>;

type RouteParams = {
    page?: string,
}

type Pokemon = {
    id: number,
    name: string,
    image: string,
    types: string[],
}

type State = {
    pokemon: Pokemon[],
    pagination: {
        perPage: number,
        total: number,
    },
    search: string,
}

type PokemonResponse = {
    data: Pokemon[],
    meta: {
        per_page: number,
        total: number,
    }
}

const PokemonPhoto = styled.img`
    height: 120px;
    object-fit: contain;
`;


const Container = styled.div`
    padding: 48px;
    background: ${theme.colors.brand};
    height: 100%;
`;

const Content = styled.div`
    max-width: 1280px;
    margin: auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 32px;
`;

const EmptyState = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    font-weight: bold;
`;

export default class Pokedex extends React.Component<Props, State> {
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
        if(this.totalPages() === this.currentPage() && this.totalPages() !== 0) return false;
        return true;
    }

    private hasPreviousPage(): boolean {
        return this.currentPage() !== 1;
    }

    async loadPokemon(search: string) {
        const data: AxiosResponse<PokemonResponse> = await axios.get(
            config.baseUrl + "/v1/pokemon",
            {
                params: {
                    page: this.currentPage(),
                    name: search,
                }
            }
        );
        this.setState({
            pokemon: data.data.data,
            pagination: {
                perPage: data.data.meta.per_page,
                total: data.data.meta.total,
            }
        });
    }

    private searchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value,
        });
        this.loadPokemon(event.target.value);
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
                                Aww Magikarp! We couldn't find anyone by that name.
                            </EmptyState>
                        ) : null}
                        {this.state.pokemon.map((pokemon: Pokemon) =>
                            <Card key={pokemon.id}>
                                <CardHeader>
                                    {pokemon.name}
                                </CardHeader>
                                <CardBody>
                                    <PokemonPhoto src={pokemon.image} />
                                </CardBody>
                            </Card>
                        )}
                    </CardContainer>
                </Content>
            </Container>
        );
    }
}