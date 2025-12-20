import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCommentList } from './customer-comment-list';

describe('CustomerCommentList', () => {
  let component: CustomerCommentList;
  let fixture: ComponentFixture<CustomerCommentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCommentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCommentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
