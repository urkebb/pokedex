import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, Input, OnInit, signal } from '@angular/core';
import { Pokemon, PokemonSummary } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokemonFacade } from '../../../facades/pokemon.facade';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit {

  pokemonFacade = inject(PokemonFacade);

  pokemonList = computed(() => this.pokemonFacade.filteredPokemonList());

  constructor() {}

  ngOnInit(): void {

  }

  trackByFn(_: number, pokemon: PokemonSummary): number {
    return pokemon.id;
  }
}
