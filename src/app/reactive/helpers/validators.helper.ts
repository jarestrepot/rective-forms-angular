import { Validators } from "@angular/forms"
export const validatorsHelpers = {
  minLength: [Validators.required, Validators.minLength(3)],
  minInteger: [Validators.required, Validators.min(0)],
}
