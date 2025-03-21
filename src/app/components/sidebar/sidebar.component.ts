import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Inject, Input, output, QueryList, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidebarContent } from '../../directives/sidebar/sidebar.model';

@Component({
  selector: 'sidebar',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate('0.3s ease-in-out',
          style({
            opacity: 1,
            transform: 'translateX(0%)'
          })
        )
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0%)',
          opacity: 1
        }),
        animate('0.3s ease-in-out',
          style({
            opacity: 0,
            transform: 'translateX(100%)'
          })
        )
      ])
    ])
  ]
})
export class SidebarComponent {
  @HostBinding('@animation') animationState = true;
  close = output();

  constructor(
    @Inject('SIDEBAR_CONTENT') public sidebarContent: SidebarContent
  ) { }

  handleClose() {
    this.close.emit();
  }
}
