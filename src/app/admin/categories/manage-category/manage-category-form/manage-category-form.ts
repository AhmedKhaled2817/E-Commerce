import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { SharedModule } from '@app/Shared';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-category-form',
  standalone:true,
  imports: [SharedModule, TranslatePipe],
  templateUrl: './manage-category-form.html',
  styleUrl: './manage-category-form.scss',
})
export class ManageCategoryForm   implements  OnInit {

  private readonly formBuilder=inject(FormBuilder);

  readonly manageCatForm=viewChild.required<FormGroupDirective>('manageCatForm');

  form!:FormGroup;

  ngOnInit(): void {
    this.initFormModels()
  }

  private initFormModels():void{
    this.form=this.formBuilder.group({
      name:this.formBuilder.group({
        en:['',Validators.required],
        ar:['',Validators.required],
      }),
      description:this.formBuilder.group({
        en:[''],
        ar:[''],
      }),
      imgUrl:[null],
      slug:[null],
      createdAt:[new Date()],
      updatedAt:[null],
      isActive:[true],
      parentId:[null],
      productsCount:[0,Validators.min(0)]
    })
  }


  save(event:Event):void{
    this.manageCatForm().onSubmit(event);
    if(this.form.valid){
      console.log("value", this.form.value);
    }
  }
}
