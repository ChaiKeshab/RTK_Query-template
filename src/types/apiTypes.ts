export interface PokemonType {
    name: string;
    url: string;
}

export interface AllPokemonLResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonType[];
}