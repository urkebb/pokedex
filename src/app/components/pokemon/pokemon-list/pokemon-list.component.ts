import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, Input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokemonService } from '../pokemon.service';
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

  pokemonService = inject(PokemonService);
  pokemonFacade = inject(PokemonFacade);

  pokemonList = computed(() => this.pokemonFacade.filteredPokemonList());

  constructor() {}

  ngOnInit(): void {

  }

  trackByFn(_: number, pokemon: Pokemon): number {
    return pokemon.id;
  }
}
