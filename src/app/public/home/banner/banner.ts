import { Component } from '@angular/core';
import { Highlight } from 'app/Shared/directive/highlight';

@Component({
  selector: 'app-banner',
  imports: [
    Highlight
  ],
  standalone:true,
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {

}
