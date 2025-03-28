import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox.component';

@Component({
  selector: 'type-filter',
  imports: [CheckboxComponent],
  templateUrl: './type-filter.component.html',
  styleUrl: './type-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeFilterComponent {
  isChecked = input.required<boolean>();
  value = input.required<string>();
  checked = output();

  onChecked() {
    this.checked.emit();
  }

}
