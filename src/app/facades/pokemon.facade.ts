import { computed, DestroyRef, inject, Injectable, signal, Signal } from "@angular/core";
import { PokeapiService } from "../services/pokeapi.service";
import { BehaviorSubject, catchError, delay, delayWhen, finalize, map, of, switchMap, tap } from "rxjs";
import { Pokemon, PokemonStat, PokemonSummary } from "../models/pokemon";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

@Injectable({
	providedIn: "root"
})
export class PokemonFacade {
	private readonly destroyRef = inject(DestroyRef);
	private readonly pokeapiService = inject(PokeapiService);
	private readonly _isLoading = signal(true);

	public readonly isLoading = computed(() => this._isLoading());

	readonly pokemonList = signal<PokemonSummary[]>([]);
	readonly shadowPokemonList = signal<number[]>(Array.from({ length: 20 }, (_, i) => i));

	readonly filteredPokemonList = signal<PokemonSummary[]>([]);

	constructor() {
		this.pokeapiService
			.getPokemonList()
			.pipe(
				tap((pokemonList) => {
          console.log(pokemonList[0])
					const pokemonSummaryList = this.getPokemonSummaryList(pokemonList);
					this.pokemonList.set(pokemonSummaryList);
					this.filteredPokemonList.set(pokemonSummaryList);
					this.setIsLoading(false);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	setFilteredPokemonList(pokemonList: PokemonSummary[]) {
		this.filteredPokemonList.set(pokemonList);
	}

	resetPokemonList() {
		this.filteredPokemonList.set(this.pokemonList());
	}

  private setIsLoading(isLoading: boolean) {
    this._isLoading.set(isLoading);
  }

	private getPokemonSummaryList(pokemonList: Pokemon[]): PokemonSummary[] {
		return pokemonList.map((pokemon) => ({
			id: pokemon.id,
			name: pokemon.name,
			types: pokemon.types.map((type) => ({
				name: type.type.name,
				url: type.type.url
    })),
			mainType: pokemon.types[0].type,
			sprite: pokemon.sprites.other.dream_world.front_default,
      weight: pokemon.weight,
      height: pokemon.height,
      abilities: pokemon.abilities.map(ability => ({
        name: ability.ability.name,
        url: ability.ability.url
      })),
      stats: pokemon.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
		}));
	}
}
