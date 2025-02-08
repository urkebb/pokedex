import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
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

@Component({
  selector: 'app-search',
  imports: [CommonModule, SvgIconComponent, InputFieldComponent, ButtonComponent, PokemonListComponent, DropdownComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent {
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

  constructor() {

  }

}
