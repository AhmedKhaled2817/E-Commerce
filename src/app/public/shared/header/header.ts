import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MegaMenu } from './mega-menu/mega-menu';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from '../../public-routing-module';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from '@app/Shared';
import { Language } from 'app/Shared/Service/language';
import { debounceTime, distinctUntilChanged, Subject, tap, switchMap, of } from 'rxjs';
import { Products } from 'app/Shared/Models/products';
import { ProductsService } from 'app/Shared/Service/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MegaMenu, CommonModule, PublicRoutingModule, TranslatePipe, SharedModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  showMenu: boolean = false;
  showMobileMenu: boolean = false;

  private readonly lang = inject(Language);
  private readonly productService= inject(ProductsService);
  private readonly router=inject(Router);

  private timeoutId: any;


  // ==== Search ====  //
  searchInput$=new Subject<string>();
  result:Products[]=[];
  loading:boolean=false;
  showSearch:boolean=false;
  showDropdown:boolean=false;
  activeIndex:number=-1;
  term:string='';


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


  ngOnInit(): void {
    this.searchInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(v=>{
        this.term=v;
        this.loading=true;
        this.showDropdown=true;
      }),
      switchMap(q=> q? this.productService.searchProducts(q) : of([]))
    ).subscribe(res=>{
      this.result=res.slice(0,6);
      this.loading=false;
      this.activeIndex=-1;
    })
  }

  toggleSearch(){
    this.showSearch=!this.showSearch;
  }

  onSearchInput(v:string){
    this.searchInput$.next(v);
  }

  onKeyDown(e:KeyboardEvent){
    if(e.key==='ArrowDown')
      this.activeIndex=Math.min(this.activeIndex+1,this.result.length-1);
    if(e.key==='ArrowUp')
      this.activeIndex=Math.max(this.activeIndex-1,0);
    if(e.key==='Enter'){
      if(this.activeIndex>=0){
        this.openProduct(this.result[this.activeIndex]);
      }
      else{
        this.openFullResults();
      }
    }
  }

  openProduct(p:Products){
    this.showDropdown=false;
    this.router.navigate(['/public/product',p.id]);
  }

  openFullResults(){
    this.showDropdown=false;
    this.router.navigate(['/public/products'],{
      queryParams:{
        s:this.term,
      }
    })
  }

  HighLight(text: string) {
    if (!this.term) return text;

  const escaped = this.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return text.replace(
    new RegExp(`(${escaped})`, 'gi'),
    '<mark>$1</mark>'
  );
}

  @HostListener('document:click',['$event'])
  closeOutSide(e:MouseEvent){
    if(!(e.target as HTMLElement).closest('.search-box')){
      this.showDropdown=false;
    }
  }

}
