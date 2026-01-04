import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


import { DialogSize } from '@app/Shared/Enums';


@Injectable({
  providedIn: 'root',
})
export class Dialog {

  private readonly dialog=inject(MatDialog);

  openAddEditDialog<T>(component:ComponentType<T>,size:DialogSize,config?:MatDialogConfig):MatDialogRef<T,any>{
    return this.open(component,{
      ...config,
      panelClass:`panel-class-${size}`
    });
  }

  private open<T>(component:ComponentType<T>, config?:MatDialogConfig):MatDialogRef<T,any>{
    return this.dialog.open(component,config)
  }



}
