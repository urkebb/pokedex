import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AfterContentInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PokemonSummary } from '../../../models/pokemon';
import { TabsComponent } from '../../tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { TabItemDirective } from '../../tabs/tab-item.directive';
import { getPokemonNumber } from '../pokemon.functions';
import { PokemonTypeComponent } from "../pokemon-type/pokemon-type.component";
import { capitalizeFirstLetter } from '../../../shared/util-functions';

@Component({
  selector: 'pokemon-details',
  imports: [TabsComponent, CommonModule, TabItemDirective, PokemonTypeComponent],
  standalone: true,
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.type]': 'pokemon?.mainType'
  }
})
export class PokemonDetailsComponent implements OnInit {
 public pokemon: PokemonSummary = inject(DIALOG_DATA);

 private dialogRef = inject(DialogRef<string>);

 typeNames: string[] = [];
 abilities: string[] = [];

 get pokemonNumber(): string {
    return getPokemonNumber(this.pokemon.id);
 }

 get name(): string {
  const name = this.pokemon?.name ?? '';
  return capitalizeFirstLetter(name);
}

  constructor() {  }

  ngOnInit() {
    this.typeNames = this.pokemon.types.map(type => capitalizeFirstLetter(type.name));
    this.abilities = this.pokemon.abilities.map(a => a.name.split('-').map(word => capitalizeFirstLetter(word)).join(' '));
  }
}
