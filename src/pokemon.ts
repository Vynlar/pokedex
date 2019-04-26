export type PokemonType = "bug" | "dragon" | "electric" | "fighting" | "fire" | "flying" | "ghost" | "grass" | "ground" | "ice" | "normal" | "poison" | "psychic" | "rock" | "water" | "fairy";

export interface Pokemon {
    id: number,
    name: string,
    image: string,
    types: PokemonType[],
}

export type Stat = "hp" | "speed" | "attack" | "defense" | "specialAttack" | "specialDefense";

export function statToString(stat: Stat) {
    switch (stat) {
        case "hp":
            return "HP";
    
        case "speed":
            return "Speed";
    
        case "defense":
            return "Defense";
    
        case "specialAttack":
            return "Sp Atk";
    
        case "specialDefense":
            return "Sp Def";

        case "attack":
            return "Attack";
    }
}

export interface DetailedPokemon extends Pokemon {
    height: number,
    weight: number,
    abilities: string[],
    eggGroups: string[],
    stats: {
        hp: number,
        speed: number,
        attack: number,
        defense: number,
        specialAttack: number,
        specialDefense: number,
    },
    genus: string,
    description: string,
}