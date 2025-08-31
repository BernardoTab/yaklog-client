import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passControl = formGroup.get(password);
    const confirmPassControl = formGroup.get(confirmPassword);

    if (!passControl || !confirmPassControl) {
      return null;
    }

    return passControl.value === confirmPassControl.value
      ? null
      : { passwordMismatch: true };
  };
}