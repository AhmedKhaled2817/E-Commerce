import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-mega-menu',
  imports: [],
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.scss',
})
export class MegaMenu {
  @Input({required:true}) showMenu:boolean=false;
}
