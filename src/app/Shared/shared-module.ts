import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material-module';


const modules=[
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
];


@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports:[
    ...modules,
  ]
})
export class SharedModule { }
