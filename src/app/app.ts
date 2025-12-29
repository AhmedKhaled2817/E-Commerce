import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from './Shared/Service/language';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  implements OnInit {

  private readonly languageService=inject(Language);

  ngOnInit(): void {
    this.languageService.initDefaultLang();
  }
}
