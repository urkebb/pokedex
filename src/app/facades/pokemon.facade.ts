import { computed, DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { BehaviorSubject, catchError, delay, finalize, tap } from 'rxjs';
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

  private readonly _isLoading = signal(false);

  public readonly isLoading = computed(() => this._isLoading());

  readonly pokemonList = signal<Pokemon[]>([]);
  readonly shadowPokemonList = signal<number[]>(Array.from({ length: 20 }, (_, i) => i));

  readonly filteredPokemonList = signal<Pokemon[]>([]);

  constructor() {
    this.setLoading(true);
      this.pokeapiService.getPokemonList().pipe(
        tap(pokemonList => {
          this.pokemonList.set(pokemonList);
          this.filteredPokemonList.set(pokemonList);
        }),
        delay(4000),
        finalize(() => this.setLoading(false)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
   }

   setFilteredPokemonList(pokemonList: Pokemon[]) {
      this.filteredPokemonList.set(pokemonList)
   }

   resetPokemonList() {
      this.filteredPokemonList.set(this.pokemonList())
   }

   setLoading(isLoading: boolean) {
      this._isLoading.set(isLoading);
   }

}
