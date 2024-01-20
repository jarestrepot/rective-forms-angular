import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  gender: string,
  wantNotifications: boolean
}

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termAndConditions: [ true, Validators.requiredTrue ],
  });

  @ViewChild('invalidMessage')
  public messageError!: ElementRef<HTMLSpanElement>;
  public mockPerson:Person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor( private fb: FormBuilder){}

  ngOnInit(): void {
    this.myForm.reset( this.mockPerson );
  }

  onSave(){
    if( this.myForm.valid ){
      const { termAndConditions, ...newPerson } = this.myForm.value;
      this.mockPerson = newPerson;
      this.myForm.reset( this.mockPerson );
      return ;
    }
    this.myForm.markAllAsTouched();
  }

  isValidRadius( fieldRadius: string ):boolean{
    return Boolean( this.myForm.controls[fieldRadius].errors );
  }

  isValidField( field:string ):boolean {
    return Boolean( this.myForm.touched && this.myForm.controls[ field ].errors );
  }
}
