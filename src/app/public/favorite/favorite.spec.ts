import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favorite } from './favorite';

describe('Favorite', () => {
  let component: Favorite;
  let fixture: ComponentFixture<Favorite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Favorite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
