import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'input-field',
  imports: [SvgIconComponent, ButtonComponent],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {

  constructor() {   }
}
