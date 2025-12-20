import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByCategories } from './shop-by-categories';

describe('ShopByCategories', () => {
  let component: ShopByCategories;
  let fixture: ComponentFixture<ShopByCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopByCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopByCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
