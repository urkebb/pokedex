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
import { CdkPortal, ComponentPortal, Portal, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-search',
  imports: [CommonModule, SvgIconComponent, InputFieldComponent, ButtonComponent, PokemonListComponent, DropdownComponent, SidebarComponent, PortalModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements AfterViewInit {
  @ViewChild(CdkPortal) portal !: CdkPortal;
  @ViewChild('sidebarContent') sidebarContent!: TemplateRef<unknown>;
  private readonly pokeapiService = inject(PokeapiService);

  public readonly isLoading = signal(true);

  public readonly pokemonList: Signal<Pokemon[]> = toSignal(this.pokeapiService.getPokemonList().pipe(
    tap( result => console.log(result, 'result')),
    catchError(() => {
      return [];
    }),
    finalize(() => this.isLoading.set(false))
  ), {
    initialValue: []
  });

  constructor(private readonly overlay: Overlay) {
  }

  ngAfterViewInit(): void {
    this.openFilters()
  }

  openFilters() {
    const portal = new ComponentPortal(SidebarComponent);
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().right().right(),
      width: '336px',
      height: '100%'
    });
    const componentRef = overlayRef.attach(portal);
    componentRef.instance.content = this.sidebarContent;
    componentRef.instance.close.subscribe(() => overlayRef.detach())
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

}
