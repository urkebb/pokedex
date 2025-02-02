export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  types: PokemonType[];
  name: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}
