import {
  Component,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { BestSellerService } from 'app/Shared/Service/best-seller.service';
import { CommonModule } from '@angular/common';
import { Language } from 'app/Shared/Service/language';
import { register } from 'swiper/element/bundle';

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
export class BestSeller implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  private bestSellerService = inject(BestSellerService);
  private languageService = inject(Language);

  readonly products = this.bestSellerService.bestSellers;

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
