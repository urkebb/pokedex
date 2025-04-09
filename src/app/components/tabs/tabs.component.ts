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
export class TabsComponent implements AfterViewInit, AfterContentInit {

  items = input<Tab[]>([]);
  tabClick = output<TabItemDirective>();

  @ContentChildren(TabItemDirective) tabsList!: QueryList<TabItemDirective>;
  tabItems = signal<TabItemDirective[]>([]);

  get activeTabItem(): TabItemDirective | undefined {
    return this.tabItems().find((item) => item?.isActive);
  }

  ngAfterContentInit(): void {
    this.tabItems.set(Array.from(this.tabsList));
    this.tabItems.update(tabs => {
      tabs[0].isActive = true;
      return tabs;
    })
  }

  ngAfterViewInit(): void {
  }

  onTabClick(item: TabItemDirective) {
    this.tabItems().forEach((item) => {
      item.isActive = false;
    });
    item.isActive = true;
    this.tabClick.emit(item);
  }

}
