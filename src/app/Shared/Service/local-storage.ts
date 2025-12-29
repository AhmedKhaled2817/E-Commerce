import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {

  getItem(key:string):string | null{
    return localStorage.getItem(key);
  }

  setItem(key:string,val:string):void{
    localStorage.setItem(key,val);
  }

}
