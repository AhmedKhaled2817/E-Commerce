import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComment } from './customer-comment';

describe('CustomerComment', () => {
  let component: CustomerComment;
  let fixture: ComponentFixture<CustomerComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
