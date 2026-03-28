import {
  Component,
  inject,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CategoryCard } from './category-card/category-card';
import { ProductsService } from 'app/Shared/Service/products-service';
import { Language } from 'app/Shared/Service/language';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-shop-by-categories',
  standalone: true,
  imports: [CategoryCard],
  templateUrl: './shop-by-categories.html',
  styleUrl: './shop-by-categories.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShopByCategories implements OnInit, AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  private productService = inject(ProductsService);
  private languageService = inject(Language);

  categoriesList: Array<{ name: string; imageUrl: string }> = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.productService.getCategoriesWithImages().subscribe({
      next: (res) => {
        this.categoriesList = res.map((cat) => ({
          name: cat.subCategory,
          imageUrl: cat.imageUrl,
        }));
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
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
        1400: { slidesPerView: 5 },
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
