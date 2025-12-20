import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstgramCard } from './instgram-card';

describe('InstgramCard', () => {
  let component: InstgramCard;
  let fixture: ComponentFixture<InstgramCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstgramCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstgramCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
