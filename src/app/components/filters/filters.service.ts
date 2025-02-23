import { inject, Injectable, INJECTOR, signal } from '@angular/core';
import { TypeFilter } from './type-filter/type-filter.model';
import { POKEMON_HEIGHTS, POKEMON_TYPES, POKEMON_WEIGHTS } from '../pokemon/pokemon.const';
import { firstLetterToUppercase } from '../../functions/string.functions';
import { HeightFilterState } from './height-filter/heigh-filter.model';
import { WeightFilterState } from './weight-filter/weight-filter.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Pokemon, PokemonHeight, PokemonWeight } from '../../models/pokemon';
import { PokemonFacade } from '../../facades/pokemon.facade';
import { getPokemonTypes } from '../pokemon/pokemon.functions';
import { SidebarService } from '../../services/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly sidebarService = inject(SidebarService);

  private pokemonList = this.pokemonFacade.pokemonList;

  private typeFilters = signal<TypeFilter[]>([]);
  private heightFilters = signal<HeightFilterState[]>([])
  private weightFilters = signal<WeightFilterState[]>([]);

  readonly typeFilters$ = toObservable(this.typeFilters);
  readonly heightFilters$ = toObservable(this.heightFilters);
  readonly weightFilters$ = toObservable(this.weightFilters);

  private get activeTypeFilters(): string[] {
    return this.typeFilters().filter(filter => filter.checkboxState.isChecked).map(filter => filter.checkboxState.value);
  }

  private get activeHeighFilter(): PokemonHeight | undefined {
    return this.heightFilters().find(filter => filter.isSelected)?.height;
  }

  private get activeWeightFilter(): PokemonWeight | undefined {
    return this.weightFilters().find(filter => filter.isSelected)?.weight;
  }

  constructor() {
    this.setInitialState();
  }

  onTypeFilterClick(index: number) {
    this.typeFilters.update(filters => {
      const checkbox = filters[index].checkboxState
      checkbox.isChecked = !checkbox.isChecked;
      return filters;
    })
  }

  onHeightFilterClick(index: number) {
    this.heightFilters.update(filters => {
      filters.forEach(h => {
        if (h.height !== filters[index].height) {
          h.isSelected = false;
          return;
        }
        h.isSelected = !h.isSelected;
      });

      return filters;
    })
  }

  onWeightFilterClick(index: number) {
    this.weightFilters.update(filters => {
      filters.forEach(w => {
        if (w.weight !== filters[index].weight) {
          w.isSelected = false;
          return;
        }
        w.isSelected = !w.isSelected;
      });

      return filters;
    })
  }

  onApplyFilters() {
    let filteredList: Pokemon[] = this.pokemonList()?.filter(
      pokemon => this.getFilterConditionByPokemon(pokemon)
    ) || [];

    this.pokemonFacade.setFilteredPokemonList(filteredList);
    this.sidebarService.setState({ open: false });
  }

  onResetFilters() {
    this.setInitialState();
  }

  private getFilterConditionByPokemon(pokemon: Pokemon): boolean {
      const heightLimit = this.getPokemonHeightLimit(this.activeHeighFilter as PokemonHeight);

      const weightLimit = this.getPokemonWeightLimit(this.activeWeightFilter as PokemonWeight);

      const pokemonTypes = getPokemonTypes(pokemon);

      const mappingObject = {
        'height': this.activeHeighFilter ? pokemon.height >= heightLimit.min && pokemon.height <= heightLimit.max : true,
        'weight': this.activeWeightFilter ? pokemon.weight >= weightLimit.min && pokemon.weight <= weightLimit.max : true,
        'types': this.activeTypeFilters?.length ? this.activeTypeFilters.every(type => pokemonTypes.includes(type)) : true
      }

      return Object.values(mappingObject).every(value => value);
  }

  private setInitialState() {
    this.heightFilters.set(POKEMON_HEIGHTS.map((height) => ({ height, isSelected: false })))

    this.weightFilters.set(POKEMON_WEIGHTS.map((weight) => ({ weight, isSelected: false })))

    this.typeFilters.set(POKEMON_TYPES.map((type) => ({
      checkboxState: {
        isChecked: false,
        value: type
      },
      label: firstLetterToUppercase(type)
    })))
  }

  private getPokemonHeightLimit(height: PokemonHeight): {
    min: number;
    max: number;
  } {
    if (height === 'small') {
      return { min: 0, max: 10 };
    }

    if (height === 'medium') {
      return { min: 10, max: 20 };
    }

    return { min: 20, max: Number.MAX_VALUE };
  }

  private getPokemonWeightLimit(weight: PokemonWeight): {
    min: number;
    max: number;
  } {
    if (weight === 'small') {
      return { min: 0, max: 100 };
    }

    if (weight === 'medium') {
      return { min: 100, max: 200 };
    }

    return { min: 200, max: Number.MAX_VALUE };
  }

}
