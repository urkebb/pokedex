import { Component } from '@angular/core';
import { SvgIconComponent } from "../../components/svg-icon/svg-icon.component";
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-search',
  imports: [SvgIconComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {


}
