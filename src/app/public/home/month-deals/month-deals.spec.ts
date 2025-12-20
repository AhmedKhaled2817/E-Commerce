import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDeals } from './month-deals';

describe('MonthDeals', () => {
  let component: MonthDeals;
  let fixture: ComponentFixture<MonthDeals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthDeals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthDeals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
