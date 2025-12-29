import { Component, signal } from '@angular/core';
import { SharedModule } from '@app/Shared';
import { ICategory } from '.';
import { MatTableDataSource } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [SharedModule,TranslatePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {

  displayColumns:string[]=['id','name','weight'];

  categories=signal<ICategory[]>([
    { id: 1, name: 'Electronics', weight: 10 },
    { id: 2, name: 'Fashion', weight: 5 },
    { id: 3, name: 'Books', weight: 8 },
    { id: 4, name: 'Home Appliances', weight: 6 },
  ]);


  dataSoucre= new MatTableDataSource<ICategory>(this.categories());

  addCategory():void{

  }
}
