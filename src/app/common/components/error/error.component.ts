import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
const VALIDATION_MESSAGES={
  required:"This field is required",
  email:"Email is not valid"
}
@Component({
  selector: 'error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
@Input({required:true}) control!:AbstractControl;
@Input({required:true}) showError:boolean=true;
@Input({required:true}) errorMessages:string[]=[];
 
checkValidation():void{
  const errors=this.control.errors;
  if(!errors) {
    this.errorMessages=[];
    return
  }
  const errorKeys=Object.keys(errors);
}

}
