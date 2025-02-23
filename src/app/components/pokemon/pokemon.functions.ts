import { Pokemon } from "../../models/pokemon";

export const getPokemonTypes = (pokemon: Pokemon) => {
  return pokemon.types.map(type => type.type.name);
}
