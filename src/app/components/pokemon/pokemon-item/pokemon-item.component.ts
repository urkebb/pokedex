import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { PokemonService } from '../pokemon.service';
import { PokemonFacade } from '../../../facades/pokemon.facade';
import { animate, style, transition, trigger } from '@angular/animations';
import { Dialog, DialogModule, DialogRef }  from '@angular/cdk/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'pokemon-item',
  imports: [CommonModule, SvgIconComponent, DialogModule],
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
    '[attr.type]': 'pokemon()?.types[0]?.type?.name'
  }
})
export class PokemonItemComponent {
  pokemon = input<Pokemon>();
  pokemonService = inject(PokemonService);
  pokemonFacade = inject(PokemonFacade);

  dialog = inject(Dialog);

  constructor() {

   }

  get sprite(): string {
    return this.pokemon()?.sprites?.other?.dream_world?.front_default ?? '';
  }

  get number(): string {
    return this.pokemon()?.id.toString().padStart(3, '0') ?? '';
  }

  get name(): string {
    const name = this.pokemon()?.name ?? '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getTypeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  handlePokemonClick() {
    const ref = this.dialog.open<string, Pokemon>(PokemonDetailsComponent, {
      minWidth: '400px',
      data: this.pokemon(),
      autoFocus: false,
      hasBackdrop: true
    });

  }

}
