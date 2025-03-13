import { Pokemon, PokemonHeight, PokemonWeight } from "../../models/pokemon";

export const getPokemonTypes = (pokemon: Pokemon) => {
  return pokemon.types.map(type => type.type.name);
}


export const getPokemonHeightLimit = (height: PokemonHeight): {
  min: number;
  max: number;
} => {
  if (height === 'small') {
    return { min: 0, max: 10 };
  }

  if (height === 'medium') {
    return { min: 10, max: 20 };
  }

  return { min: 20, max: Number.MAX_VALUE };
}

export const getPokemonWeightLimit = (weight: PokemonWeight): {
  min: number;
  max: number;
} => {
  if (weight === 'small') {
    return { min: 0, max: 100 };
  }

  if (weight === 'medium') {
    return { min: 100, max: 200 };
  }

  return { min: 200, max: Number.MAX_VALUE };
}
