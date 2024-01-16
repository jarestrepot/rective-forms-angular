import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validatorsHelpers } from '../../helpers/validators.helper';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', validatorsHelpers.minLength ],
    favoriteGames: this.fb.array([
      ['Metal Geard', Validators.required ],
      ['Death Strandung', Validators.required ]
    ])
  });

  public newFavorite: FormControl = new FormControl( '', validatorsHelpers.minLength );

  constructor( private fb:FormBuilder ){}

  get favoriteGame(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }

  getFieldError( field: string ): string | null {

    if (!this.myForm.controls[field] && !this.myForm.controls[field].errors) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
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

  onDeleteFavorite( index:number ):void {
    this.favoriteGame.removeAt( index )
  }

  onAddTofavorites():void{
    if( this.newFavorite.invalid ) {
      this.newFavorite.markAllAsTouched();
      return;
    }

    this.favoriteGame.push(
      this.fb.control( this.newFavorite.value , validatorsHelpers.minLength )
    );

    this.newFavorite.reset();
  }

  isInvalidAddFavorite():boolean {
    return this.newFavorite.touched && this.newFavorite.getError('minlength')
  }

  onSubmit( ):void{
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([])
    this.myForm.reset();
  }
}
