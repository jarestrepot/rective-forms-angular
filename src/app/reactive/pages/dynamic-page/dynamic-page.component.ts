import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validatorsHelpers } from '../../helpers/validators.helper';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

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

  constructor( private fb:FormBuilder, private validatorsService: ValidatorsService){}

  get favoriteGame(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( field, this.myForm );
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return this.validatorsService.isValidFieldInArray( formArray, index );
  }

  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError(field, this.myForm );
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
