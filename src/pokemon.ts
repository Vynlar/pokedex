export type PokemonType = "bug" | "dragon" | "electric" | "fighting" | "fire" | "flying" | "ghost" | "grass" | "ground" | "ice" | "normal" | "poison" | "psychic" | "rock" | "water" | "fairy";

export type Pokemon = {
    id: number,
    name: string,
    image: string,
    types: PokemonType[],
}
