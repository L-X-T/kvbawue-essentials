import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorKeys'
})
export class ErrorKeysPipe implements PipeTransform {
  transform(errors: ValidationErrors): string[] {
    return errors ? Object.keys(errors) : [];
  }
}
