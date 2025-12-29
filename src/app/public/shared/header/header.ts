import { Component, inject } from '@angular/core';
import { MegaMenu } from './mega-menu/mega-menu';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from '../../public-routing-module';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from '@app/Shared';
import { Language } from 'app/Shared/Service/language';

@Component({
  selector: 'app-header',
  imports: [MegaMenu, CommonModule, PublicRoutingModule, TranslatePipe, SharedModule ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showMenu: boolean = false;
  showMobileMenu: boolean = false;

  private readonly lang=inject(Language);

  toggle(show: boolean): void {
    this.showMenu = show;
  }

  toggleMobile(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  naviagteToLang(lang:string):void{
    this.lang.naviagteToLang(lang);
  }
}
