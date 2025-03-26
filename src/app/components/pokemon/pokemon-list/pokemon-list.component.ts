import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokemonService } from '../pokemon.service';
import { PokemonFacade } from '../../../facades/pokemon.facade';

@Component({
  selector: 'pokemon-list',
  imports: [CommonModule, PokemonItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit {

  pokemonService = inject(PokemonService);
  pokemonFacade = inject(PokemonFacade);

  constructor() {}

  ngOnInit(): void {

  }
}
