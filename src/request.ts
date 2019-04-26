import axios, { AxiosResponse } from 'axios';

import config from './config';
import { Pokemon, DetailedPokemon } from './pokemon';

interface PaginationResponse {
    data: Pokemon[],
    meta: {
        per_page: number,
        total: number,
    }
}

export async function fetchPageOfPokemon(currentPage: number, search: string) {
    const data: AxiosResponse<PaginationResponse> = await axios.get(
        config.baseUrl + "/v1/pokemon",
        {
            params: {
                page: currentPage,
                name: search,
            }
        }
    );
    return data.data;
}

interface PokemonResponse {
    data: Pokemon & {
        height: number,
        weight: number,
        abilities: string[],
        egg_groups: string[],
        stats: {
            hp: number,
            speed: number,
            attack: number,
            defense: number,
            'special-attack': number,
            'special-defense': number,
        },
        genus: string,
        description: string,
    },
}

export async function fetchPokemonById(id: number): Promise<DetailedPokemon> {
    const data: AxiosResponse<PokemonResponse> = await axios.get(
        config.baseUrl + "/v1/pokemon/" + id,
    );
    const pokemon = data.data.data;

    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        types: pokemon.types,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
        eggGroups: pokemon.egg_groups,
        stats: {
            hp: pokemon.stats.hp,
            attack: pokemon.stats.attack,
            defense: pokemon.stats.defense,
            speed: pokemon.stats.speed,
            specialAttack: pokemon.stats['special-attack'],
            specialDefense: pokemon.stats['special-defense'],
        },
        genus: pokemon.genus,
        description: pokemon.description,
    };
}