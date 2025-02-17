import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SidebarService } from '../../services/sidebar.service';
import { CheckboxComponent, CheckboxState } from '../checkbox/checkbox.component';
import { POKEMON_HEIGHTS, POKEMON_TYPES } from '../pokemon/pokemon.const';
import { firstLetterToUppercase } from '../../functions/string.functions';
import { HeightFilterComponent, HeightFilterState } from '../filters/height-filter/height-filter.component';

@Component({
  selector: 'filters-sidebar',
  imports: [ButtonComponent, CheckboxComponent, HeightFilterComponent],
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersSidebarComponent {
  checkboxItems: CheckboxState[] = POKEMON_TYPES.map(type => new CheckboxState(false, firstLetterToUppercase(type), type));

  heightFilters: HeightFilterState[] = POKEMON_HEIGHTS.map((height, index) => {
    if (index === 0) {
      return { height, isSelected: true };
    }

    return { height, isSelected: false };
  })

  constructor(private readonly sidebarService: SidebarService) {}

  onClose() {
    this.sidebarService.setState({ open: false });
  }

  onCheckboxClick(index: number) {
    this.checkboxItems[index].isChecked = !this.checkboxItems[index].isChecked;
  }

  onHeightFilterClick(index: number) {
    this.heightFilters.forEach(h => {
      if (h.height !== this.heightFilters[index].height) {
        h.isSelected = false;
        return;
      }
      h.isSelected = !h.isSelected;
    });
  }
}
