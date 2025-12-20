import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstgramStories } from './instgram-stories';

describe('InstgramStories', () => {
  let component: InstgramStories;
  let fixture: ComponentFixture<InstgramStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstgramStories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstgramStories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
