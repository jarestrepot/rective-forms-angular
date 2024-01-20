import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required , Validators.pattern( this.validatorService.firstNameAndLastnamePattern ) ]],
    // email: ['', [Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ new EmailValidatorService() ]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [ this.emailValidator ]],
    username: ['', [Validators.required, this.validatorService.cantBeStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    passwordConfirmation: ['', [ Validators.required ]]
  },{
    // Validadores grupales. ( Podemos pasar todos los validadores )
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo( 'password', 'passwordConfirmation' )
    ]
  });

  constructor( private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ){}

  isValidField( field:string ): boolean | null {
    return this.validatorService.isValidField( field, this.myForm );
  }

  onSuibmit( ):void {
    this.myForm.markAllAsTouched();
  }
}
