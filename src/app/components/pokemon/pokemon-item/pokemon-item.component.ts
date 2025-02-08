import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'pokemon-item',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.type]': 'pokemon()?.types[0]?.type?.name'
  }
})
export class PokemonItemComponent {
  pokemon = input<Pokemon>();

  get sprite(): string {
    return this.pokemon()?.sprites?.other?.dream_world?.front_default ?? '';
  }

  get number(): string {
    return this.pokemon()?.id.toString().padStart(3, '0') ?? '';
  }

  get name(): string {
    const name = this.pokemon()?.name ?? '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getTypeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

}
