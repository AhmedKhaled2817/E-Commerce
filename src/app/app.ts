import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from './Shared/Service/language';
import { LoadingService } from './Core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly languageService = inject(Language);
  private readonly loadingService = inject(LoadingService);

  isLoading = this.loadingService.loading;

  ngOnInit(): void {
    this.languageService.initDefaultLang();
  }
}
