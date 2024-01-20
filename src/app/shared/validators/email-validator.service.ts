import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {

  // Validación asyncrona.
  // validate(control: AbstractControl ): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   return of( {
  //     emailtaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   )
  // }

  validate( control: AbstractControl ): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null >( ( subscriber ) => {
      if ( email === 'javier@google.com' ){
        subscriber.next( { emailTaken: true } );
        // Deja de emitir valores
        subscriber.complete();
      }
      subscriber.next( null );
      subscriber.complete();
    }).pipe(
      delay( 2000 )
    );
    return httpCallObservable;
  }



}
