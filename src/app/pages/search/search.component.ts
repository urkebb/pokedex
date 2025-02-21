import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal, Signal, TemplateRef, ViewChild } from '@angular/core';
import { SvgIconComponent } from "../../components/svg-icon/svg-icon.component";
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { ButtonComponent } from '../../components/button/button.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../../models/pokemon';
import { catchError, finalize, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../../components/pokemon/pokemon-list/pokemon-list.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { Overlay } from '@angular/cdk/overlay';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { SidebarTriggerDirective } from '../../directives/sidebar-trigger.directive';
import { FiltersSidebarComponent } from '../../components/filters-sidebar/filters-sidebar.component';


@Component({
  selector: 'app-search',
  imports: [CommonModule, SvgIconComponent, InputFieldComponent, ButtonComponent, PokemonListComponent, DropdownComponent, SidebarComponent, PortalModule, SidebarTriggerDirective, FiltersSidebarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SvgIconComponent]
})

export class SearchComponent  {
  @ViewChild(CdkPortal) portal !: CdkPortal;
  @ViewChild('sidebarContent') sidebarContent!: TemplateRef<unknown>;
  private readonly pokeapiService = inject(PokeapiService);

  public readonly isLoading = signal(true);

  public readonly pokemonList: Signal<Pokemon[]> = toSignal(this.pokeapiService.getPokemonList().pipe(
    catchError(() => {
      return [];
    }),
    finalize(() => this.isLoading.set(false))
  ), {
    initialValue: []
  });

  constructor() {
  }
}
