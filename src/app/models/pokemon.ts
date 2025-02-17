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
  id: number;
  types: PokemonType[];
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      dream_world: {
        front_default: string;
        back_default: string
      };
    }
  }
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export type PokemonHeight = 'small' | 'medium' | 'large';
