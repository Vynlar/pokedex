import * as React from 'react';
import { RouteComponentProps, withRouter, BrowserRouterProps, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Container, Content, Header, Loading, EmptyState, hideOnMobile } from './Layout';

import config, { theme } from './config';
import { Pokemon, PokemonType } from './pokemon';

import Button from './Button';
import Card, { CardHeader, CardBody, CardContainer } from './Card';
import Search from './Search';
import Pill from './Pill';
import { fetchPageOfPokemon } from './request';
import { TinyColor } from '@ctrl/tinycolor';

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
    width: 100%;
`;

const CardLink = styled(Link)`
    text-decoration: none;
    flex: 1;
`;

const MobileFooter = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 48px;
    background: ${new TinyColor(theme.colors.brand).darken(30).toHexString()};
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(2px) brightness(50%);
    padding: 0 16px;

    @media (min-width: 768px) {
        display: none;
    }
`;

const HideOnMobile = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
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
            const data = await fetchPageOfPokemon(this.currentPage(), search);
            this.setState({
                pokemon: data.data,
                pagination: {
                    perPage: data.meta.per_page,
                    total: data.meta.total,
                },
                loading: false,
            });
        }, 250);
    }

    private updateSearchState(value: string) {
        this.setState({
            search: value,
        });
        this.loadPokemon(value);
        /* redirect to the first page whenever you type into the search bar
          This is to prevent invalid state for `currentPage`. For example, if you are on page 7, and then search for something specific,
          it's likely that page 7 no longer exists and so redirecting to page 1 fixes this problem
        */
        this.props.history.push(`/page/1`);
    }

    private searchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateSearchState(event.target.value);
    }


    private clearSearch = () => {
        this.updateSearchState("");
    }

    private renderBackButton() {
        return (
            <Button disabled={!this.hasPreviousPage()} to={`/page/${this.currentPage() - 1}`}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
        );
    }

    private renderNextButton() {
        return (
            <Button disabled={!this.hasNextPage()} to={`/page/${this.currentPage() + 1}`}>
                <FontAwesomeIcon icon={faArrowRight} />
            </Button>
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <HideOnMobile>
                            {this.renderBackButton()}
                        </HideOnMobile>
                        <Search onChange={this.searchChanged} value={this.state.search} onClear={this.clearSearch} />
                        <HideOnMobile>
                            {this.renderNextButton()}
                        </HideOnMobile>
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
                                <CardLink to={`/pokemon/${pokemon.id}`}>
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
                                </CardLink>
                            )
                        )}
                    </CardContainer>

                    <MobileFooter>
                        {this.renderBackButton()}
                        {this.renderNextButton()}
                    </MobileFooter>
                </Content>
            </Container>
        );
    }
}

export default withRouter(Pokedex);
