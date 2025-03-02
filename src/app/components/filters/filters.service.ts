import { computed, inject, Injectable, INJECTOR, signal } from '@angular/core';
import { TypeFilter } from './type-filter/type-filter.model';
import { POKEMON_HEIGHTS, POKEMON_TYPES, POKEMON_WEIGHTS } from '../pokemon/pokemon.const';
import { firstLetterToUppercase } from '../../functions/string.functions';
import { HeightFilterState } from './height-filter/heigh-filter.model';
import { WeightFilterState } from './weight-filter/weight-filter.model';
import { Pokemon, PokemonHeight, PokemonWeight } from '../../models/pokemon';
import { PokemonFacade } from '../../facades/pokemon.facade';
import { getPokemonTypes } from '../pokemon/pokemon.functions';
import { SidebarService } from '../../services/sidebar.service';
import { Option } from '../../models/dropdown';
import { OrderFilter, OrderFilterValue } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly sidebarService = inject(SidebarService);

  private pokemonList = this.pokemonFacade.filteredPokemonList;

  private _typeFilters = signal<TypeFilter[]>([]);
  private _heightFilters = signal<HeightFilterState[]>([])
  private _weightFilters = signal<WeightFilterState[]>([]);
  private _orderFilters = signal<OrderFilter[]>([]);

  readonly typeFilters = computed(() => this._typeFilters())
  readonly heightFilters = computed(() => this._heightFilters());
  readonly weightFilters = computed(() => this._weightFilters());
  readonly orderFilters = computed(() => this._orderFilters());

  private get activeTypeFilters(): string[] {
    return this._typeFilters().filter(filter => filter.checkboxState.isChecked).map(filter => filter.checkboxState.value);
  }

  private get activeHeighFilter(): PokemonHeight | undefined {
    return this._heightFilters().find(filter => filter.isSelected)?.height;
  }

  private get activeWeightFilter(): PokemonWeight | undefined {
    return this._weightFilters().find(filter => filter.isSelected)?.weight;
  }

  constructor() {
    this.setInitialState();
  }

  onTypeFilterClick(index: number) {
    this._typeFilters.update(filters => {
      const checkbox = filters[index].checkboxState
      checkbox.isChecked = !checkbox.isChecked;
      return filters;
    })
  }

  onHeightFilterClick(index: number) {
    this._heightFilters.update(filters => {
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
    this._weightFilters.update(filters => {
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

  onOrderFilterClick(index: number) {
    this._orderFilters.update(filters => filters.map((filter, filterIndex) => filterIndex === index ? {...filter, isSelected: true} : {...filter, isSelected: false}))

      const mappingObj: Record<OrderFilterValue, () => Pokemon[]> = {
        'lowestNumber': () => [...this.pokemonList()].sort((a, b) => a.id - b.id),
        'highestNumber': () => [...this.pokemonList()].sort((a, b) => b.id - a.id),
        'aToZ': () => [...this.pokemonList()].sort((a, b) => a.name.localeCompare(b.name)),
        'zToA': () => [...this.pokemonList()].sort((a, b) => b.name.localeCompare(a.name))
      }

      const filterValue = this._orderFilters()[index].value;

      const orderedList: Pokemon[] = mappingObj[filterValue]();

      this.pokemonFacade.setFilteredPokemonList(orderedList);
  }

  onApplyFilters() {
    if (!this.activeTypeFilters.length && !this.activeHeighFilter && !this.activeWeightFilter) {
      this.pokemonFacade.resetPokemonList();
      this.sidebarService.setState({ open: false });
      return;
    }

    const filteredList = this.pokemonList().filter(pokemon => this.getFilterConditionByPokemon(pokemon));

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
    this._heightFilters.set(POKEMON_HEIGHTS.map((height) => ({ height, isSelected: false })))

    this._weightFilters.set(POKEMON_WEIGHTS.map((weight) => ({ weight, isSelected: false })))

    this._typeFilters.set(POKEMON_TYPES.map((type) => ({
      checkboxState: {
        isChecked: false,
        value: type
      },
      label: firstLetterToUppercase(type)
    })))

    this._orderFilters.set([
      { label: 'Lowest Number First', value: 'lowestNumber', isSelected: true },
      { label: 'Highest Number First', value: 'highestNumber', isSelected: false },
      { label: 'Alphabetically (A-Z)', value: 'aToZ', isSelected: false },
      { label: 'Alphabetically (Z-A)', value: 'zToA', isSelected: false }
    ])
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
