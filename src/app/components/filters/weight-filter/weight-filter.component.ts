import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { WeightFilterState } from './weight-filter.model';

@Component({
  selector: 'weight-filter',
  imports: [],
  templateUrl: './weight-filter.component.html',
  styleUrl: './weight-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.weight]': 'state().weight',
    '[class.selected]': 'state().isSelected'
  }
})
export class WeightFilterComponent {
  state = input.required<WeightFilterState>();
  clicked = output<void>()

    constructor() {
    }

    onClick() {
      this.clicked.emit();
    }

}
