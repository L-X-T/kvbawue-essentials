import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-flight-validation-error',
  templateUrl: './flight-validation-error.component.html',
  styleUrls: ['./flight-validation-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightValidationErrorComponent {
  @Input({ required: true }) errors?: ValidationErrors | null = null;
  @Input() fieldLabel = 'Field';

  errorMessages: { [error: string]: string } = {
    required: this.fieldLabel + ' is required.',
    minlength: this.fieldLabel + ' minlength is 3.',
    maxlength: this.fieldLabel + ' maxlength is 15.',
    pattern: this.fieldLabel + ' has invalid input.'
  };
}
