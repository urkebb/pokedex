import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export interface CheckboxState {
  isChecked: boolean;
  value: string;
  width?: number;
  height?: number;
}

@Component({
  selector: 'checkbox',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--height]': 'height()',
    '[style.--width]': 'width()',
  },
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [style({opacity: 0, transform: 'translateX(0)' }), animate('300ms ease-in-out', style({opacity: 1}))]),
    ])
  ]
})
export class CheckboxComponent {
  state = input.required<CheckboxState>();
  checked = output<void>();

  height = computed(() => this.state().height || 15);
  width = computed(() => this.state().width || 15);

  constructor() { }

  onClick(): void {
    this.checked.emit();
  }

}
