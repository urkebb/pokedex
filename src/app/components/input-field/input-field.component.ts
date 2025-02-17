import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { ButtonComponent } from '../button/button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'input-field',
  imports: [SvgIconComponent, ButtonComponent, NgOptimizedImage],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {

  constructor() {   }
}
