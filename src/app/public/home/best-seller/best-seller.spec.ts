import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSeller } from './best-seller';

describe('BestSeller', () => {
  let component: BestSeller;
  let fixture: ComponentFixture<BestSeller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSeller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSeller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
