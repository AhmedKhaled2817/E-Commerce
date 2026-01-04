import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryForm } from './manage-category-form';

describe('ManageCategoryForm', () => {
  let component: ManageCategoryForm;
  let fixture: ComponentFixture<ManageCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
