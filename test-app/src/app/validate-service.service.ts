import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateServiceService {

  constructor(validator: Validators) { }


  validate(str:any){

    return str.validate(['', [Validators.required, Validators.pattern(/^[\w-\.]+@(docquity)\.+(com)$/)]]);
  
  }
}
