import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Translation } from './translation';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class Language {

  private readonly translationService = inject(Translation);
  private readonly localStorageService = inject(LocalStorage);
  private readonly document = inject(DOCUMENT);

  readonly defaultLang = signal('en').asReadonly();
  readonly langKey = signal('lang').asReadonly();
  readonly currentLang = signal('');

  private html!: HTMLElement;

  initDefaultLang(): void {
    const lang =
      this.localStorageService.getItem(this.langKey()) ??
      this.defaultLang();

    this.currentLang.set(lang);

    this.html = this.document.documentElement;

    this.translationService.setDefaultLaguage(lang);
    this.updateLayout();
  }

  naviagteToLang(lang: string): void {
    this.localStorageService.setItem(this.langKey(), lang);
    this.currentLang.set(lang);

    this.translationService.use(lang);
    this.updateLayout();
  }

  private updateLayout(): void {
    this.html.lang = this.currentLang();
    this.document.body.dir = this.isArabic() ? 'rtl' : 'ltr';
  }

  private isArabic(): boolean {
    return this.currentLang() === 'ar';
  }
}
