import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestSeller } from './best-seller';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Language } from 'app/Shared/Service/language';
import { selectAllBestSellers } from 'app/Core/store/best-sellers/best-sellers.selectors';
import { BestSellerActions } from 'app/Core/store/best-sellers/best-sellers.actions';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

describe('BestSeller Component (Public)', () => {
  let component: BestSeller;
  let fixture: ComponentFixture<BestSeller>;
  let store: MockStore;

  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      imgUrl: 'img1.jpg',
      description: 'Desc 1',
      price: '$10',
      oldPrice: '$20',
    },
  ];

  beforeEach(async () => {
    const languageSpy = jasmine.createSpyObj('Language', ['currentLang']);
    languageSpy.currentLang.and.returnValue(signal('en'));

    await TestBed.configureTestingModule({
      imports: [BestSeller],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectAllBestSellers, value: mockProducts }],
        }),
        { provide: Language, useValue: languageSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BestSeller);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBestSellers on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(BestSellerActions.loadBestSellers());
  });

  it('should initialize swiper on AfterViewInit', () => {
    const initSwiperSpy = spyOn(component as any, 'initSwiper');
    component.ngAfterViewInit();
    expect(initSwiperSpy).toHaveBeenCalled();
  });

  it('should navigate swiper slides', () => {
    component.swiperRef = {
      nativeElement: {
        swiper: {
          slideNext: jasmine.createSpy('slideNext'),
          slidePrev: jasmine.createSpy('slidePrev'),
        },
      },
    } as any;

    component.nextSlide();
    expect(component.swiperRef.nativeElement.swiper.slideNext).toHaveBeenCalled();

    component.prevSlide();
    expect(component.swiperRef.nativeElement.swiper.slidePrev).toHaveBeenCalled();
  });
});
