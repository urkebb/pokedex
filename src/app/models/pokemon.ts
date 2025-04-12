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
  weight: number;
  height: number;
  types: PokemonType[];
  name: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    }
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      dream_world: {
        front_default: string;
        back_default: string
      };
    }
  },
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    }
  }[];
}

export interface PokemonAbility {
  name: string;
  url: string;
}

export interface PokemonSummary {
  id: number;
  name: string;
  sprite: string;
  mainType: PokemonTypeSummary;
  types: PokemonTypeSummary[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

export interface PokemonStat {
  value: number;
  name: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface PokemonTypeSummary {
  name: string;
  url: string;
}

export type PokemonHeight = 'small' | 'medium' | 'large';
export type PokemonWeight = 'small' | 'medium' | 'large';
