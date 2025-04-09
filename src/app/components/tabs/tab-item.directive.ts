import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[tabItem]',
  standalone: true
})
export class TabItemDirective {

  @Input() state: {
    label: string;
    content: TemplateRef<unknown> | null;
  } = {
    label: '',
    content: null,
  }

  isActive = false;

  constructor() { }

}
