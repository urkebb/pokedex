import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, signal, Signal, TemplateRef, ViewChild } from '@angular/core';
import { SvgIconComponent } from "../../components/svg-icon/svg-icon.component";
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { ButtonComponent } from '../../components/button/button.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../../models/pokemon';
import { catchError, filter, finalize, Observable, startWith, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../../components/pokemon/pokemon-list/pokemon-list.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { Overlay } from '@angular/cdk/overlay';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { FiltersSidebarComponent } from '../../components/filters-sidebar/filters-sidebar.component';
import { PokemonFacade } from '../../facades/pokemon.facade';
import { FiltersService } from '../../components/filters/filters.service';
import { Option } from '../../models/dropdown';
import { SidebarTriggerDirective } from '../../directives/sidebar/sidebar-trigger.directive';


@Component({
  selector: 'app-search',
  imports: [CommonModule, SvgIconComponent, InputFieldComponent, ButtonComponent, PokemonListComponent, DropdownComponent, SidebarComponent, PortalModule, SidebarTriggerDirective, FiltersSidebarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SvgIconComponent]
})

export class SearchComponent  {
  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly filtersService = inject(FiltersService);

  pokemonList = this.pokemonFacade.filteredPokemonList;
  orderFilters = this.filtersService.orderFilters;

  constructor() { }

  onDropdownOptionClicked(index: number) {
    this.filtersService.onOrderFilterClick(index);
  }

  onTextChange(text: string) {
    console.log(text, 'TEXT')
    this.filtersService.setSearchText(text);
  }

  onSubmit() {
    this.filtersService.onApplyFilters();
  }
}
