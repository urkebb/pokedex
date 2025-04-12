import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, input, output, QueryList, signal, TemplateRef, ViewChild, ViewChildren, WritableSignal } from '@angular/core';
import { TabItemDirective } from './tab-item.directive';

export interface Tab {
  label: string;
  isActive: boolean;
  content?: TemplateRef<unknown>;
}

@Component({
  selector: 'tabs',
  standalone: true,
  imports: [CommonModule, TabItemDirective],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit {
  tabClick = output<TabItemDirective>();

  @ContentChildren(TabItemDirective) tabsList!: QueryList<TabItemDirective>;
  tabItems = signal<TabItemDirective[]>([]);

  get activeTabItem(): TabItemDirective | undefined {
    return this.tabItems().find((item) => item?.isActive);
  }

  ngAfterViewInit(): void {
    this.tabItems.set(Array.from(this.tabsList));
    console.log(this.tabItems(), 'brake')
  }

  onTabClick(item: TabItemDirective) {
    this.tabItems().forEach((item) => {
      item.setIsActive(false);
    });
    item.setIsActive(true);
    this.tabClick.emit(item);
  }
}
