import { Component, inject } from '@angular/core';
import { MegaMenu } from './mega-menu/mega-menu';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from '../../public-routing-module';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from '@app/Shared';
import { Language } from 'app/Shared/Service/language';

@Component({
  selector: 'app-header',
  imports: [MegaMenu, CommonModule, PublicRoutingModule, TranslatePipe, SharedModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showMenu: boolean = false;
  showMobileMenu: boolean = false;

  private readonly lang = inject(Language);

  private timeoutId: any;

  toggle(show: boolean): void {
    if (show) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.showMenu = true;
    } else {
      this.timeoutId = setTimeout(() => {
        this.showMenu = false;
      }, 300);
    }
  }

  toggleMegaMenu(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.showMenu = !this.showMenu;
  }

  toggleMobile(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.showMenu = false;
    this.showMobileMenu = !this.showMobileMenu;
  }

  naviagteToLang(lang: string): void {
    this.lang.naviagteToLang(lang);
  }
}
