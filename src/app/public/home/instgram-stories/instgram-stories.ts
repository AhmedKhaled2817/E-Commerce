import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InstgramCard } from './instgram-card/instgram-card';

@Component({
  selector: 'app-instgram-stories',
  standalone:true,
  imports: [CommonModule,InstgramCard],
  templateUrl: './instgram-stories.html',
  styleUrl: './instgram-stories.scss',
})
export class InstgramStories {

  readonly imgs:string[]

  constructor(){
    this.imgs=[
      'images/lady_one.jpg',
      'images/lady_two.jpg',
      'images/lady_three.jpg',
      'images/lady_four.png'
    ]
  }
}
