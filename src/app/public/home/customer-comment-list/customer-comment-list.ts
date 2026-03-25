import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { IcutomerList } from './models/icutomer-list';
import { CommonModule } from '@angular/common';
import { CustomerComment } from './customer-comment/customer-comment';
import { register } from 'swiper/element/bundle';
import { Language } from 'app/Shared/Service/language';
import { TranslatePipe } from '@ngx-translate/core';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-customer-comment-list',
  standalone: true,
  imports: [CommonModule, CustomerComment, TranslatePipe],
  templateUrl: './customer-comment-list.html',
  styleUrl: './customer-comment-list.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerCommentList implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  private readonly languageService = inject(Language);

  readonly testimonials: IcutomerList[];

  constructor() {
    this.testimonials = [
      {
        name: 'Leslie Alexander',
        position: 'Model',
        img: 'https://i.pravatar.cc/150?u=1',
        stars: 5,
        comments:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      },
      {
        name: 'Jacob Jones',
        position: 'Co-Founder',
        img: 'https://i.pravatar.cc/150?u=2',
        stars: 5,
        comments:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      },
      {
        name: 'Jenny Wilson',
        position: 'Fashion Designer',
        img: 'https://i.pravatar.cc/150?u=3',
        stars: 5,
        comments:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      },
      {
        name: 'Ahmed Khaled',
        position: 'Software Engineer',
        img: 'https://i.pravatar.cc/150?u=4',
        stars: 5,
        comments:
          'The quality of the products and the ease of navigation on the site made my shopping experience wonderful. Highly recommended!',
      },
      {
        name: 'Sara Ahmed',
        position: 'UI Designer',
        img: 'https://i.pravatar.cc/150?u=5',
        stars: 5,
        comments:
          'Great customer service and very fast delivery. The items were exactly as described.',
      },
    ];
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;

    const swiperParams = {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      grabCursor: true,
      speed: 600,
      dir: this.languageService.currentLang() === 'ar' ? 'rtl' : 'ltr',
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
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
