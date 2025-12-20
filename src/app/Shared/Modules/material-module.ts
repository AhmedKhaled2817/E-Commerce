import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

const modules=[
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
  MatIconModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports:[
    ...modules,
  ]
})
export class MaterialModule { }
