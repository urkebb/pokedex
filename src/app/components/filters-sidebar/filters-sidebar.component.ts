import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SidebarService } from '../../services/sidebar.service';
import { CheckboxComponent, CheckboxState } from '../checkbox/checkbox.component';
import { POKEMON_HEIGHTS, POKEMON_TYPES, POKEMON_WEIGHTS } from '../pokemon/pokemon.const';
import { firstLetterToUppercase } from '../../functions/string.functions';
import { HeightFilterComponent } from '../filters/height-filter/height-filter.component';
import { TypeFilterComponent } from '../filters/type-filter/type-filter.component';
import { TypeFilter } from '../filters/type-filter/type-filter.model';
import { HeightFilterState } from '../filters/height-filter/heigh-filter.model';
import { WeightFilterState } from '../filters/weight-filter/weight-filter.model';
import { WeightFilterComponent } from '../filters/weight-filter/weight-filter.component';
import { FiltersService } from '../filters/filters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'filters-sidebar',
  imports: [ButtonComponent, CheckboxComponent, HeightFilterComponent, TypeFilterComponent, WeightFilterComponent, CommonModule],
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersSidebarComponent {

  private readonly filtersService = inject(FiltersService);

  public readonly typeFilters$ = this.filtersService.typeFilters$;
  public readonly heightFilters$ = this.filtersService.heightFilters$;;
  public readonly weightFilters$ = this.filtersService.weightFilters$;;

  constructor(
    private readonly sidebarService: SidebarService
  ) { }

  onClose() {
    this.sidebarService.setState({ open: false });
  }

  onTypeFilterClick(index: number) {
    this.filtersService.onTypeFilterClick(index);
  }

  onHeightFilterClick(index: number) {
    this.filtersService.onHeightFilterClick(index);
  }

  onWeightFilterClick(index: number) {
    this.filtersService.onWeightFilterClick(index);
  }

  onApplyFilters() {
    this.filtersService.onApplyFilters();
  }

  onResetFilters() {
    this.filtersService.onResetFilters();
  }
}
