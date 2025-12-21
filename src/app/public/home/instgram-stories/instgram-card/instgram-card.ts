import { CommonModule } from '@angular/common';
import { Component, input} from '@angular/core';

@Component({
  selector: 'app-instgram-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './instgram-card.html',
  styleUrl: './instgram-card.scss',
})
export class InstgramCard {

  // @Input({required:true})  imgUrl!:string;

  imgUrl=input.required<string>()

  isHovering:boolean=false;

  onMouseEnter(show:boolean):void{
    this.isHovering=show;
  }

}
