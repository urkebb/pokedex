import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'svg-icon',
  imports: [SvgIconComponent],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SvgIconComponent implements OnChanges {

  public svgIcon = signal<unknown>(null);

  @Input()
  public name?: string;

  @Input()
  theme: 'primary' | 'secondary' | 'none' = 'none';

  @Input()
  width?: string;

  @Input()
  height?: string;

  @HostBinding('class.primary')
  get isPrimaryTheme(): boolean {
    return this.theme === 'primary';
  }

  @HostBinding('class.secondary')
  get isSecondaryTheme(): boolean {
    return this.theme === 'secondary';
  }

  constructor(
    private readonly httpClient: HttpClient,
    private readonly sanitizer: DomSanitizer
    ) {
  }

  ngOnChanges(): void {
    if (!this.name) {
      this.svgIcon.set('');
      return;
    }

    if (this.svgIcon()) {
      return;
    }
    this.httpClient
      .get(`assets/images/${this.name}.svg`, { responseType: 'text' })
      .subscribe(value => {
        this.svgIcon.set(this.sanitizer.bypassSecurityTrustHtml(value));
      });
  }

}
