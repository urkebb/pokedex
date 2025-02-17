import { inject, Injectable } from '@angular/core';
import { delay, forkJoin, Observable, switchMap } from 'rxjs';
import { Pokemon, PokemonList } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly http = inject(HttpClient)

  constructor() { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<Pokemon[]> {
    return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon', {
      params: {
        offset,
        limit
      }
    }).pipe(
      switchMap((pokemonList: PokemonList) => {
        const detailRequests = pokemonList.results.map(pokemon => this.http.get<Pokemon>(pokemon.url));

        return forkJoin(detailRequests);
      })
    )
  }

}
