import * as React from 'react';
import { RouteComponentProps, withRouter, BrowserRouterProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

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
    loading: boolean,
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

const Loading = styled.div`
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
        loading: true,
    }

    private timer: number = 0;

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

    /**
     * @description Loads pokemon data from the server given a search string.
     * Note: If called many times in a row, it will wait for a 0.5s delay between calls before actually making the request.
     * This is to help reduce calls to the server when the user is typing into the search field.
     */
    async loadPokemon(search: string) {
        // If a timer is already going, clear it and restart
        if(this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(async () => {
            this.setState({ loading: true });
            const data = await fetchPokemon(this.currentPage(), search);
            this.setState({
                pokemon: data.data,
                pagination: {
                    perPage: data.meta.per_page,
                    total: data.meta.total,
                },
                loading: false,
            });
        }, 500);
    }

    private searchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value,
        });
        this.loadPokemon(event.target.value);
        /* redirect to the first page whenever you type into the search bar
          This is to prevent invalid state for `currentPage`. For example, if you are on page 7, and then search for something specific,
          it's likely that page 7 no longer exists and so redirecting to page 1 fixes this problem
        */
        this.props.history.push(`/page/1`);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Button disabled={!this.hasPreviousPage()} to={`/page/${this.currentPage() - 1}`}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                        <Search onChange={this.searchChanged} value={this.state.search} />
                        <Button disabled={!this.hasNextPage()} to={`/page/${this.currentPage() + 1}`}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </Header>

                    <CardContainer>
                        <Loading visible={this.state.loading}>
                            Loading...
                        </Loading>

                        {this.state.pokemon.length === 0 && !this.state.loading ? (
                            <EmptyState>
                                Aww Magikarp!
                                We couldn't find any Pokémon by that name.
                            </EmptyState>
                        ) : (
                            this.state.pokemon.map((pokemon: Pokemon) =>
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
                            )
                        )}
                    </CardContainer>
                </Content>
            </Container>
        );
    }
}

export default withRouter(Pokedex);
