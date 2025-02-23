import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PokemonHeight } from '../../../models/pokemon';

@Component({
  selector: 'height-filter',
  imports: [],
  templateUrl: './height-filter.component.html',
  styleUrl: './height-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.height]': 'height()',
    '[class.selected]': 'isSelected()'
  }
})
export class HeightFilterComponent {
  isSelected = input.required<boolean>();
  height = input.required<PokemonHeight>();


  clicked = output<void>()

  constructor() {
  }

  onClick() {
    this.clicked.emit();
  }
}
