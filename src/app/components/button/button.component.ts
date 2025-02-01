import { Component, Input } from '@angular/core';

@Component({
  selector: 'button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[attr.theme]': 'theme'
  }
})
export class ButtonComponent {

  @Input()
  theme: 'primary' | 'secondary' | 'outlined' = 'primary';

}
