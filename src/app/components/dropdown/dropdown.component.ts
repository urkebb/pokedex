import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, OnChanges, output, signal } from '@angular/core';
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
  options = input<Option[]>([]);
  optionChanged = output<number>();

  isOpen = signal(false);

  selectedOption = computed(() => this.options().find(option => option.isSelected));

  handleTriggerClick(): void {
    this.isOpen.update(val => !val);
  }

  onOptionClick(index: number) {
    const activeOptionIdx = this.options().findIndex(option => option.isSelected);
    if (index === activeOptionIdx)
      return;
    this.isOpen.set(false);
    this.optionChanged.emit(index);
  }

}
