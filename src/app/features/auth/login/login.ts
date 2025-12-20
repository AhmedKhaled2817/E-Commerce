import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../Shared/Modules/material-module';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{

  form!:FormGroup;

  private formBuilder=inject(FormBuilder)

  private router=inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  signIn():void{
    if(this.form.valid){
      console.log("form value",this.form.value);
    }
  }

  private  initForm():void{
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      rememberMe:[false,[Validators.requiredTrue]]
    })
  }

  navigateToPage(url:string):void{
    this.router.navigateByUrl(url);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/1200x800';
  }
}
