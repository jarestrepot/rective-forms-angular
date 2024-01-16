import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { validatorsHelpers } from '../../helpers/validators.helper';

interface BasicForm {
  name:string;
  price: number;
  inStorage: number;
}

const rtx5090: BasicForm = {
  name:'RTX 5090',
  price: 2500,
  inStorage: 3
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   nama: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], [])
  // });

  public myForm: FormGroup = this.fb.group({
    name: [ '', validatorsHelpers.minLength , [] ],
    price: [ 0, validatorsHelpers.minInteger , [] ],
    inStorage: [0, validatorsHelpers.minInteger , [] ],
  })

  // Form Builder
  constructor( private fb: FormBuilder ){}

  ngOnInit(): void {
    // this.myForm.reset( rtx5090 );
  }

  isValidField( field:string ):boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError( field:string ):string | null{
    if (!this.myForm.controls[field] && !this.myForm.controls[field].errors ) return null;

    const errors = this.myForm.controls[field].errors || {};

    const mapErrors = {
      required : 'This is field is requied',
      minLength: 'This field requires a minimum of 3 letters',
      min: `Minimum 0 characters`
    }
    for ( const key of Object.keys(errors) ) {
      switch( key ){
        case 'required' : return mapErrors.required
          break
        case 'minlength' : return mapErrors.minLength
          break
        case 'min': return mapErrors.min
          break
        default : return ''
          break
      }
    }
    return ''
  }

  onSave():void{
    if( this.myForm.invalid ) {
      // Marca los campos como si fueran tocados para enviar el mensaje de error por si quiere enviar valores no permitidos.
      this.myForm.markAllAsTouched();
      return;
    }
    // hacer match para restablecer valores.
    this.myForm.reset( { price: 0, instorage: 0 } );
  }
}
