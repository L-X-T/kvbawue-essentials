import { Component, DestroyRef, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Flight } from '../../entities/flight';
import { FlightService } from '../../services/flight.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { validateCity } from '../shared/validation/city-validator';
import { validateAsyncCity } from '../shared/validation/async-city-validator';
import { validateRoundTrip } from '../shared/validation/round-trip-validator';
import { pattern } from '../../shared/global';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges {
  @Input() flight?: Flight | null;
  @Output() flightChange = new EventEmitter<Flight>();

  debug = true;
  id = '';
  showDetails = '';

  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);
  private readonly pattern = pattern;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  editForm: FormGroup = inject(FormBuilder).group(
    {
      id: [
        0,
        {
          validators: [Validators.required],
          updateOn: 'blur'
        }
      ],
      from: [
        '',
        {
          asyncValidators: [validateAsyncCity(this.flightService)],
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern(this.pattern),
            validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
          ],
          updateOn: 'blur'
        }
      ],
      to: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern(this.pattern),
            validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
          ],
          updateOn: 'blur'
        }
      ],
      date: [
        '',
        {
          validators: [Validators.required, Validators.minLength(33), Validators.maxLength(33)],
          updateOn: 'blur'
        }
      ]
    },
    {
      validators: validateRoundTrip
    }
  );

  message = '';

  private readonly valueChangesLogger = this.editForm.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date),
      takeUntilDestroyed()
    )
    .subscribe((value) => {
      console.log(value);
    });

  private readonly paramsSubscription = this.route.params.subscribe((params) => this.onRouteParams(params));

  ngOnChanges(): void {
    if (this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  save(): void {
    this.flightService
      .save(this.editForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (flight) => {
          if (this.debug) {
            console.log('saved flight:', flight);
          }

          this.flightChange.emit(flight);
          this.flight = flight;
          this.message = 'Success saving!';
          this.patchFormValue();

          setTimeout(() => this.router.navigate(['/flight-booking', 'flight-search']), 3000);
        },
        error: (err: HttpErrorResponse) => {
          if (this.debug) {
            console.error('Error', err);
          }

          this.message = 'Error saving!';
        }
      });
  }

  private patchFormValue(): void {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  private onRouteParams(params: Params) {
    this.id = params['id'];
    this.showDetails = params['showDetails'];

    this.flightService.findById(this.id).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.message = 'Success loading!';
        this.patchFormValue();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error', err);
        this.message = 'Error Loading!';
      }
    });
  }
}