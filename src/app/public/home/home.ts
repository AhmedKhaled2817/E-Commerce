import { Component, signal, viewChild } from '@angular/core';
import { Banner } from './banner/banner';
import { ShopByCategories } from './shop-by-categories/shop-by-categories';
import { BestSeller } from './best-seller/best-seller';
import { MonthDeals } from './month-deals/month-deals';
import { CustomerCommentList } from './customer-comment-list/customer-comment-list';
import { InstgramStories } from "./instgram-stories/instgram-stories";
import { Testimonials } from './testimonials/testimonials';
import { defer } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [
    Banner,
    BestSeller,
    ShopByCategories,
    MonthDeals,
    CustomerCommentList,
    InstgramStories,
    Testimonials,

],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {


}
