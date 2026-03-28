import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './Core/interceptors/error.interceptor';
import { loadingInterceptor } from './Core/interceptors/loading.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// NgRx Imports
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bestSellerReducer } from './Core/store/best-sellers/best-sellers.reducer';
import { BestSellerEffects } from './Core/store/best-sellers/best-sellers.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    importProvidersFrom(MatSnackBarModule),

    // NgRx Configuration
    provideStore({
      bestSellers: bestSellerReducer,
    }),
    provideEffects([BestSellerEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    }),
  ],
};
