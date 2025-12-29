import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Dialog {


  private readonly dialog=inject(MatDialog);

  open<T>(component:ComponentType<T>, config?:MatDialogConfig):void{
    this.dialog.open(component,config);
  }

}
