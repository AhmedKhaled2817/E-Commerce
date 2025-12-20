import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenu } from './mega-menu';

describe('MegaMenu', () => {
  let component: MegaMenu;
  let fixture: ComponentFixture<MegaMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegaMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
