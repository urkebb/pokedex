import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, linkedSignal, OnChanges, signal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { Option } from '../../models/dropdown';
import { DROPDOWN_ANIMATIONS } from './dropdown.animations';

@Component({
  selector: 'dropdown',
  imports: [CommonModule, SvgIconComponent, OverlayModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: DROPDOWN_ANIMATIONS
})
export class DropdownComponent {
  items = input<Option[]>([]);
  selectedItem = input<Option>(this.items()[0]);

  isOpen = signal(false);

  options = signal<Option[]>([
    { label: 'Lowest Number First', value: 'option1' },
    { label: 'Highest Number First', value: 'option2' },
    { label: 'Alphabetically (A-Z)', value: 'option3' },
    { label: 'Alphabetically (Z-A)', value:  'option4' }
  ]);

  selectedOption = signal(this.options()[0]);

  handleTriggerClick(): void {
    this.isOpen.update(val => !val);
  }

  isSelected(option: Option): boolean {
    return option?.value === this.selectedOption()?.value;
  }

  handleOptionClick(option: Option) {
    this.selectedOption.set(option);
    this.isOpen.set(false);
  }

}
