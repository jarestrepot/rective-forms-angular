import { Component } from '@angular/core';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  // public myForm: FormGroup = new FormGroup({
  //   nama: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], [])
  // });

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required , Validators.minLength(3) ], [] ],
    price: [ 0, [ Validators.required , Validators.min(0) ], [] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ], [] ],
  })

  // Form Builder
  constructor( private fb: FormBuilder ){}

  onSave():void{
    if( this.myForm.invalid ) return;
    console.log(this.myForm.value);
  }
}
