import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()

export class ValidationService {


  static mustMatch(controlName:string, matchingControlName:string):ValidatorFn{

    return (abstructControl:AbstractControl):ValidationErrors| null =>{

      const control =abstructControl.get(controlName);
      const matchingControl=abstructControl.get(matchingControlName);

      if(!control || !matchingControl) return null;

      if(control.value !==matchingControl.value){
        matchingControl.setErrors({
          ...matchingControl.errors,
          mustMatch:true
        });
      }
      else {
        if( matchingControl.errors){
          delete matchingControl.errors['mustMatch'];
          if(!Object.keys(matchingControl.errors).length){
            matchingControl.setErrors(null)
          }
        }
      }

      return null

    }
  }
}



 /*

 oldMethod  :
 
   static mustMatch(controlName:string, matchingControlName:string):ValidatorFn{

    return (abstructControl:AbstractControl):ValidationErrors| null =>{

      const control =abstructControl.get(controlName);
      const matchingControl=abstructControl.get(matchingControlName);

      if(!control || !matchingControl) return null;

      if(matchingControl.errors  && !matchingControl.errors['mustMatch']) return null;

      const isMatching=control.value===matchingControl.value;

      const error={mustMatch:true};
      matchingControl.setErrors(isMatching? null : error);
      return isMatching?null : error;



 */
