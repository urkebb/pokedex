import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightFilterComponent } from './weight-filter.component';

describe('WeightFilterComponent', () => {
  let component: WeightFilterComponent;
  let fixture: ComponentFixture<WeightFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
