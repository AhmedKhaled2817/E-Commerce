import { Component, inject, Input, OnInit} from '@angular/core';
import { MegaMenuModel } from './model/mega-menu-model';
import { ProductsService } from 'app/Shared/Service/products-service';
import { Products } from 'app/Shared/Models/products';
import { mainCategory } from 'app/Shared/Models/products';
import { PublicRoutingModule } from "app/public/public-routing-module";

@Component({
  selector: 'app-mega-menu',
  imports: [PublicRoutingModule],
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.scss',
})
export class MegaMenu implements OnInit {
  @Input({required:true}) showMenu:boolean=false;

  megaMenuData:MegaMenuModel[]
  constructor(){
    this.megaMenuData=[];
  }

  private productService=inject(ProductsService);


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.buildMegaMenuData(res)
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  private buildMegaMenuData(products:Products[]){

    const menu:Record<mainCategory, Set<string>>={
      Men: new Set(),
      Women: new Set(),
      Kids: new Set(),
      Footwear: new Set(),
    }

    products.forEach((p)=>{
      menu[p.mainCategory].add(p.subCategory)
    })

    this.megaMenuData=Object.keys(menu).map((key)=>{
      return {
        title: key as mainCategory,
        items: Array.from(menu[key as mainCategory]).sort()
      }
    })
  }


}
