import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Translation {

  private readonly translateService = inject(TranslateService);

  setDefaultLaguage(lang:string):void{
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  use(lang:string):Observable<any>{
    return this.translateService.use(lang);
  }

}
