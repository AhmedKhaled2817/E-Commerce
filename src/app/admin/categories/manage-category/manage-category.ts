import { Component, inject, viewChild } from '@angular/core';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";
import { MaterialModule } from "app/Shared/material/material-module";
import { ManageCategoryForm } from './manage-category-form';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-category',
  standalone:true,
  imports: [MatDialogModule, MatAnchor, MaterialModule, ManageCategoryForm, TranslatePipe],
  templateUrl: './manage-category.html',
  styleUrl: './manage-category.scss',
})
export class ManageCategory {

  private readonly dialogRef=inject(MatDialogRef<ManageCategory>);

  readonly manageCatForm=viewChild.required(ManageCategoryForm);

  close():void{
    this.dialogRef.close();
  }

  save(event:Event):void{
    this.manageCatForm().save(event);
  }

}
