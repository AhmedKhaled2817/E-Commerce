import { Component, Input } from '@angular/core';
import { IcutomerList } from '../models/icutomer-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-comment',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './customer-comment.html',
  styleUrl: './customer-comment.scss',
})
export class CustomerComment {


   testimonials!:IcutomerList;

  stars:number[]=[];

  @Input({required :true})  set comments(val:IcutomerList){
    if(val){
      this.testimonials=val;
      this.stars.length=val.stars
    }
  }
}
