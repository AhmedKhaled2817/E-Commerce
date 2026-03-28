import {
  Component,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { Language } from 'app/Shared/Service/language';
import { register } from 'swiper/element/bundle';

// NgRx Store
import { Store } from '@ngrx/store';
import { BestSellerActions } from 'app/Core/store/best-sellers/best-sellers.actions';
import { selectAllBestSellers } from 'app/Core/store/best-sellers/best-sellers.selectors';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [ProductCard, CommonModule],
  templateUrl: './best-seller.html',
  styleUrl: './best-seller.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BestSeller implements OnInit, AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  private store = inject(Store);
  private languageService = inject(Language);

  readonly products = this.store.selectSignal(selectAllBestSellers);

  ngOnInit() {
    this.store.dispatch(BestSellerActions.loadBestSellers());
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  private initSwiper() {
    const swiperEl = this.swiperRef?.nativeElement;
    if (!swiperEl) return;

    const swiperParams = {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      dir: this.languageService.currentLang() === 'ar' ? 'rtl' : 'ltr',
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
      injectStyles: [
        `
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
        `,
      ],
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }

  nextSlide() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }

  prevSlide() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }
}
