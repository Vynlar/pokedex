import axios, { AxiosResponse } from 'axios';

import config from './config';
import { Pokemon } from './pokemon';

type PokemonResponse = {
    data: Pokemon[],
    meta: {
        per_page: number,
        total: number,
    }
}


export async function fetchPokemon(currentPage: number, search: string) {
    const data: AxiosResponse<PokemonResponse> = await axios.get(
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