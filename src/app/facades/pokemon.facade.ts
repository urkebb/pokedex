import { computed, DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { BehaviorSubject, catchError, delay, delayWhen, finalize, map, of, switchMap, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { PokemonService } from '../components/pokemon/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonFacade {
  private readonly destroyRef = inject(DestroyRef);
  private readonly pokeapiService = inject(PokeapiService);
  private readonly pokemonService = inject(PokemonService);

  // public readonly isLoading = signal(true);

  // public readonly isLoading = computed(() => this._isLoading());

  readonly pokemonList = signal<Pokemon[]>([]);
  readonly shadowPokemonList = signal<number[]>(Array.from({ length: 20 }, (_, i) => i));

  readonly filteredPokemonList = signal<Pokemon[]>([]);

  constructor() {
      this.pokeapiService.getPokemonList().pipe(
        tap(pokemonList => {
          this.pokemonList.set(pokemonList);
          this.filteredPokemonList.set(pokemonList);
          this.pokemonService.setLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
   }

   setFilteredPokemonList(pokemonList: Pokemon[]) {
      this.filteredPokemonList.set(pokemonList)
   }

   resetPokemonList() {
      this.filteredPokemonList.set(this.pokemonList())
   }

   setLoading(isLoading: boolean) {
      // this.isLoading.set(isLoading);
   }

}
