import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const cantBeStrider = ( { value }: FormControl ): ValidationErrors | null  => {

  const valueControl:string = value.trim().toLowerCase();
  // Petición si el username existe o no de un backend.
  if ( valueControl === 'strider' ){
    return {
      noStrider: true,
      message: 'User staken'
    }
  }
  return null

}
