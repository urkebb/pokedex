import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';

@Component({
  selector: 'pokemon-list',
  imports: [CommonModule, PokemonItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent {
  pokemonList = input<Pokemon[]>([]);
}
