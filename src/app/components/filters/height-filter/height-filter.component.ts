import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PokemonHeight } from '../../../models/pokemon';

export interface HeightFilterState {
  height: PokemonHeight;
  isSelected: boolean;
}

@Component({
  selector: 'height-filter',
  imports: [],
  templateUrl: './height-filter.component.html',
  styleUrl: './height-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.height]': 'state().height',
    '[class.selected]': 'state().isSelected'
  }
})
export class HeightFilterComponent {
  state = input.required<HeightFilterState>();
  clicked = output<void>()

  constructor() {
  }

  onClick() {
    this.clicked.emit();
  }
}
