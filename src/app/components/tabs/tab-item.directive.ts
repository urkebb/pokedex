import { Directive, Input, TemplateRef } from '@angular/core';

interface TabItemState {
  label: string;
  content: TemplateRef<unknown> | null;
  isActive: boolean;
}

@Directive({
  selector: 'ng-template[tabItem]',
  standalone: true
})
export class TabItemDirective {

  @Input() set state(value: TabItemState) {
    this.label = value.label;
    this.content = value.content;
    this.isActive = value.isActive;
  }

  label: string = '';
  content: TemplateRef<unknown> | null = null;
  isActive: boolean = false;

  constructor() { }

  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

}
