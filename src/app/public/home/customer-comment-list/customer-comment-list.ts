import { Component } from '@angular/core';
import { IcutomerList } from './models/icutomer-list';
import { CommonModule } from '@angular/common';
import { CustomerComment } from './customer-comment/customer-comment';

@Component({
  selector: 'app-customer-comment-list',
  standalone:true,
  imports: [CommonModule,CustomerComment],
  templateUrl: './customer-comment-list.html',
  styleUrl: './customer-comment-list.scss',
})
export class CustomerCommentList {

  readonly testimonials:IcutomerList[];

  constructor(){
    this.testimonials=[
      {
      name: 'Leslie Alexander',
      position: 'Model',
      img: 'images/avatar.jpg',
      stars: 5,
      comments: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.'
    },
    {
      name: 'Jacob Jones',
      position: 'Co-Founder',
      img: 'images/avatar.jpg',
      stars: 5,
      comments: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.'
    },
    {
      name: 'Jenny Wilson',
      position: 'Fashion Designer',
      img: 'images/avatar.jpg',
      stars: 5,
      comments: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.'
    }
    ]
  }
}
