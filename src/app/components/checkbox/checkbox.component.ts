import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostListener, input, output, TemplateRef,  } from '@angular/core';

export class CheckboxState {
  constructor(public isChecked: boolean, public label: string, public value: string, public width?: number, public height?: number) {
    if (!width) this.width = 15;
    if (!height) this.height = 15;
  }
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
  labelTemplate = input.required<TemplateRef<unknown>>();
  checked = output<void>();

  height = computed(() => this.state().height);
  width = computed(() => this.state().width);

  constructor() { }

  onClick(): void {
    this.checked.emit();
  }

}
