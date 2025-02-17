import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightFilterComponent } from './height-filter.component';

describe('HeightFilterComponent', () => {
  let component: HeightFilterComponent;
  let fixture: ComponentFixture<HeightFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeightFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeightFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
