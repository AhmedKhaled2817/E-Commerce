import { Component, inject } from '@angular/core';
import { MegaMenu } from './mega-menu/mega-menu';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from '../../public-routing-module';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [MegaMenu, CommonModule, PublicRoutingModule, TranslatePipe ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showMenu: boolean = false;
  showMobileMenu: boolean = false;

  private translateService=inject(TranslateService);

  toggle(show: boolean): void {
    this.showMenu = show;
  }

  toggleMobile(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  naviagteToArb(lan:string):void{
    this.translateService.use(lan);
  }
}
