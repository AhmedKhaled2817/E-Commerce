import { Component } from '@angular/core';
import { MegaMenu } from "./mega-menu/mega-menu";
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from "../../public-routing-module";

@Component({
  selector: 'app-header',
  imports: [MegaMenu, CommonModule, PublicRoutingModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showMenu:boolean=false;
    showMobileMenu: boolean = false;

    toggle(show:boolean):void{
    this.showMenu=show;
  }

  toggleMobile():void{
    this.showMobileMenu=!this.showMobileMenu;
  }
}
