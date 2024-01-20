import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( { value }: FormControl ): ValidationErrors | null => {
    // Los validadores siempre devuelven el error del validador o null si está bien
    const valueControl: string = value.trim().toLowerCase();
    // Petición si el username existe o no de un backend.
    if ( valueControl === 'strider' ) {
      return {
        noStrider: true,
        message: 'User staken'
      }
    }
    return null
  }

  public isValidField( field: string, form: FormGroup ): boolean | null{
    return form.controls[field].errors && form.controls[field].touched
  }

  public isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }


  getFieldError(field: string, form: FormGroup): string | null {

    if ( !form.controls[field] && !form.controls[field].errors ) return null;

    const errors = form.controls[field].errors || {};

    for ( const key of Object.keys(errors) ) {
      switch (key) {
        case 'required': return 'This is field is requied'
          break
        case 'minlength': return 'This field requires a minimum of 3 letters'
          break
        case 'min': return `Minimum 0 characters`
          break
        default: return ''
          break
      }
    }
    return ''
  }

  isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValueOne:string = formGroup.get(fieldOne)?.value;
      const fieldValueTwo:string = formGroup.get(fieldTwo)?.value;

      if( fieldValueOne !== fieldValueTwo ) {
        formGroup.get(fieldTwo)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(fieldTwo)?.setErrors( null );
      return null;
    }
  }


}
