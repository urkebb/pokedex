import { computed, inject, Injectable, INJECTOR, signal } from '@angular/core';
import { TypeFilter } from './type-filter/type-filter.model';
import { POKEMON_HEIGHTS, POKEMON_TYPES, POKEMON_WEIGHTS } from '../pokemon/pokemon.const';
import { firstLetterToUppercase } from '../../functions/string.functions';
import { HeightFilterState } from './height-filter/heigh-filter.model';
import { WeightFilterState } from './weight-filter/weight-filter.model';
import { Pokemon, PokemonHeight, PokemonWeight } from '../../models/pokemon';
import { PokemonFacade } from '../../facades/pokemon.facade';
import { getPokemonHeightLimit, getPokemonTypes, getPokemonWeightLimit } from '../pokemon/pokemon.functions';
import { SidebarService } from '../../services/sidebar.service';
import { Option } from '../../models/dropdown';
import { OrderFilter, OrderFilterValue } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private readonly pokemonFacade = inject(PokemonFacade);

  private filteredPokemonList = this.pokemonFacade.filteredPokemonList;
  private pokemonList = this.pokemonFacade.pokemonList;

  private _typeFilters = signal<TypeFilter[]>([]);
  private _heightFilters = signal<HeightFilterState[]>([]);
  private _weightFilters = signal<WeightFilterState[]>([]);
  private _orderFilters = signal<OrderFilter[]>([]);
  private _searchText = signal<string>('');

  readonly typeFilters = computed(() => this._typeFilters())
  readonly heightFilters = computed(() => this._heightFilters());
  readonly weightFilters = computed(() => this._weightFilters());
  readonly orderFilters = computed(() => this._orderFilters());
  readonly selectedOrderFilter = computed(() => this._orderFilters().find(filter => filter.isSelected) || this._orderFilters()[0]);

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

    this.onApplyFilters();
  }

  onApplyFilters() {
    let filteredList: Pokemon[] = this.getFilteredList(this.pokemonList());

    filteredList = this.getOrderedList(filteredList);

    this.pokemonFacade.setFilteredPokemonList(filteredList);
  }

  onResetFilters() {
    this.setInitialState();
  }

  setSearchText(text: string) {
    this._searchText.set(text);
  }

  private getFilteredList(list: Pokemon[]): Pokemon[] {
    return list.filter(pokemon => this.getFilterConditionByPokemon(pokemon));
  }

  private getOrderedList(list: Pokemon[]): Pokemon[] {
    const mappingObj: Record<OrderFilterValue, () => Pokemon[]> = {
      'lowestNumber': () => [...list].sort((a, b) => a.id - b.id),
      'highestNumber': () => [...list].sort((a, b) => b.id - a.id),
      'aToZ': () => [...list].sort((a, b) => a.name.localeCompare(b.name)),
      'zToA': () => [...list].sort((a, b) => b.name.localeCompare(a.name))
    }

    return mappingObj[this.selectedOrderFilter().value]();
  }

  private getFilterConditionByPokemon(pokemon: Pokemon): boolean {
      const heightLimit = getPokemonHeightLimit(this.activeHeighFilter as PokemonHeight);

      const weightLimit = getPokemonWeightLimit(this.activeWeightFilter as PokemonWeight);

      const pokemonTypes = getPokemonTypes(pokemon);

      // console.log(this._searchText(), 'brajko')

      const mappingObject = {
        'height': this.activeHeighFilter ? pokemon.height >= heightLimit.min && pokemon.height <= heightLimit.max : true,
        'weight': this.activeWeightFilter ? pokemon.weight >= weightLimit.min && pokemon.weight <= weightLimit.max : true,
        'types': this.activeTypeFilters?.length ? this.activeTypeFilters.every(type => pokemonTypes.includes(type)) : true,
        'search': this._searchText() ? pokemon.name.toLowerCase().includes(this._searchText().toLowerCase()) : true
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

    this._searchText.set('');
  }
}
