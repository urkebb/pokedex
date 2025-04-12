import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, input } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'bar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fillAnimation', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('0.3s ease-out', style({ width: '{{targetWidth}}%' }))
      ])
    ])
  ]
})
export class BarComponent {
  @Input() value: number = 0;
  @Input() cssClass: string = '';

}
