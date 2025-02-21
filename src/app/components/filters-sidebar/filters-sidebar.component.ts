import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SidebarService } from '../../services/sidebar.service';
import { CheckboxComponent, CheckboxState } from '../checkbox/checkbox.component';
import { POKEMON_HEIGHTS, POKEMON_TYPES } from '../pokemon/pokemon.const';
import { firstLetterToUppercase } from '../../functions/string.functions';
import { HeightFilterComponent, HeightFilterState } from '../filters/height-filter/height-filter.component';
import { TypeFilterComponent } from '../filters/type-filter/type-filter.component';
import { TypeFilter } from '../filters/type-filter/type-filter.model';

@Component({
  selector: 'filters-sidebar',
  imports: [ButtonComponent, CheckboxComponent, HeightFilterComponent, TypeFilterComponent],
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersSidebarComponent {
  typeFilters: TypeFilter[] = POKEMON_TYPES.map((type, index) => ({
    checkboxState: {
      isChecked: false,
      value: type
    },
    label: firstLetterToUppercase(type)
  }));

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

  onTypeFilterClick(index: number) {
    const checkbox = this.typeFilters[index].checkboxState

    checkbox.isChecked = !checkbox.isChecked;
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
