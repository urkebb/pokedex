import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { ButtonComponent } from '../button/button.component';
import { NgOptimizedImage } from '@angular/common';
import {FormsModule, NgModel} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface InputError {
  required?: boolean;
}

@Component({
  selector: 'input-field',
  imports: [SvgIconComponent, ButtonComponent, NgOptimizedImage, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements AfterViewInit {
  @ViewChild('control') inputControl!: NgModel;

  destroyRef = inject(DestroyRef);

  submit = output<string>();
  changed = output<string>();

  text = '';
  constructor() { }

  ngAfterViewInit(): void {
    this.inputControl?.valueChanges?.pipe(
      takeUntilDestroyed(this.destroyRef)
    )?.subscribe((value) => {
      this.changed.emit(value);
    });
  }

  onClick(event: Event) {
    event.preventDefault();
    this.onSubmit();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();

      this.onSubmit();
    }
  }

  onSubmit() {
    this.submit.emit(this.text);
  }
}
