import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategory } from './manage-category';

describe('ManageCategory', () => {
  let component: ManageCategory;
  let fixture: ComponentFixture<ManageCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
