import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function noBlankSpacesValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of(control.value && control.value.trim().length > 0 ? null : { 'noBlankSpaces': true });
    };
}