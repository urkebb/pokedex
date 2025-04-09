import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { PokemonTypeSummary } from '../../../models/pokemon';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'pokemon-type',
  imports: [SvgIconComponent],
  standalone: true,
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTypeComponent {

  @Input()
  set type(value: PokemonTypeSummary) {
    this._type.set(value);
    this.typeName.set(value.name.charAt(0).toUpperCase() + value.name.slice(1));
  }

  _type = signal<PokemonTypeSummary>({name: '', url: ''});
  typeName = signal<string>('');
}
