import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-month-deals',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './month-deals.html',
  styleUrl: './month-deals.scss',
})
export class MonthDeals {}
