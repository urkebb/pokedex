import { computed, DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PokemonFacade {
  private readonly destroyRef = inject(DestroyRef);
  private readonly pokeapiService = inject(PokeapiService);

  readonly pokemonList = signal<Pokemon[]>([]);
  readonly filteredPokemonList = signal<Pokemon[]>([]);

  constructor() {
      this.pokeapiService.getPokemonList().pipe(
        tap(pokemonList => {
          this.pokemonList.set(pokemonList);
          this.filteredPokemonList.set(pokemonList);
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
   }

   setFilteredPokemonList(pokemonList: Pokemon[]) {
      this.filteredPokemonList.set(pokemonList)
   }

   resetPokemonList() {
      this.filteredPokemonList.set(this.pokemonList())
   }

}
