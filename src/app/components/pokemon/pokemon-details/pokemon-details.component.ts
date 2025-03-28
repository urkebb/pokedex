import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, InjectionToken, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';

@Component({
  selector: 'pokemon-details',
  imports: [],
  standalone: true,
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailsComponent implements OnInit {
 public data: Pokemon = inject(DIALOG_DATA);


  constructor() {
  }

  ngOnInit() {
    console.log(this.data.id);
    console.log(this.data.height);
  }

}
