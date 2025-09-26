import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passControl = formGroup.get(password);
    const confirmPassControl = formGroup.get(confirmPassword);

    if (!passControl || !confirmPassControl) {
      return null;
    }

    // If they don't match, set an error on the confirmPassword control
    if (passControl.value !== confirmPassControl.value) {
      confirmPassControl.setErrors({ passwordMismatch: true });
    } else {
      // Important: clear the error if they match
      const errors = confirmPassControl.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassControl.setErrors(null);
        } else {
          confirmPassControl.setErrors(errors);
        }
      }
    }

    return null;
  };
}