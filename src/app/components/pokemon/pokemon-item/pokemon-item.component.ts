import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Pokemon, PokemonSummary } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { PokemonFacade } from '../../../facades/pokemon.facade';
import { animate, style, transition, trigger } from '@angular/animations';
import { Dialog, DialogModule, DialogRef }  from '@angular/cdk/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { getPokemonNumber } from '../pokemon.functions';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { capitalizeFirstLetter } from '../../../shared/util-functions';

@Component({
  selector: 'pokemon-item',
  imports: [CommonModule, SvgIconComponent, DialogModule, PokemonTypeComponent],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  host: {
    '[attr.type]': 'pokemon()?.mainType?.name'
  }
})
export class PokemonItemComponent {
  pokemon = input<PokemonSummary>();
  pokemonFacade = inject(PokemonFacade);

  dialog = inject(Dialog);

  constructor() {

   }

  get sprite(): string {
    return this.pokemon()?.sprite ?? '';
  }

  get number(): string {
    return getPokemonNumber(this.pokemon()?.id ?? 0);
  }

  get name(): string {
    const name = this.pokemon()?.name ?? '';
    return capitalizeFirstLetter(name);
  }

  getTypeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  handlePokemonClick() {
    const dialogRef = this.dialog.open<string, PokemonSummary>(PokemonDetailsComponent, {
      minWidth: '300px',
      width: '725px',
      data: this.pokemon(),
      autoFocus: true,
      hasBackdrop: true,
      restoreFocus: false
    });

    dialogRef.closed.subscribe(result => console.log(result, 'closed'))
  }

}
