# Managing side effects with @ngrx/effects

- [Managing side effects with @ngrx/effects](#managing-side-effects-with-ngrxeffects)
  - [Creating an Effect](#creating-an-effect)
  - [Bonus: Error Handling](#bonus-error-handling)

In this exercise you will create an effect for loading flights.

## Creating an Effect

1. Open your `flight-booking.actions.ts` file and add a `loadFlights` action creator:

   <details>
   <summary>Show code</summary>
   <p>

   ```typescript
   [...]

   export const loadFlights = createAction(
     '[FlightBooking] LoadFlights',
     props<{ from: string, to: string, urgent: boolean }>()
   );
   ```

   </p>
   </details>

2. Open the file `flight-booking.effects.ts` and add an effect that takes a `FlightsLoadAction`, loads the requested flights and returns a `FlightsLoadedAction`.

    <details>
    <summary>Show code</summary>
    <p>

   ```typescript
   // make sure to use this import:
   import * as FlightBookingActions from './flight-booking.actions';

   @Injectable()
   export class FlightBookingEffects {
     loadFlights$ = createEffect(
       (): Observable<any> =>
         this.actions$.pipe(
           ofType(FlightBookingActions.loadFlights),
           switchMap((action) => this.flightService.find(action.from, action.to, action.urgent)),
           map((flights) => FlightBookingActions.flightsLoaded({ flights }))
         )
     );

     constructor(
       private actions$: Actions,
       private flightService: FlightService
     ) {}
   }
   ```

    </p>
    </details>

   **Tipp:** Import the `Actions` type from the module `@ngrx/effects`:

   `import {Actions} from '@ngrx/effects';`

3. Open the file `flight-search.component.ts`. Change the `search` method so that it just dispatches a `loadFlights` action.

   <details>
   <summary>Show code</summary>
   <p>

   ```typescript
   search(): void {
     if (!this.from || !this.to) {
       return;
     }

     // New:
     this.store.dispatch(loadFlights({
       from: this.from,
       to: this.to,
       urgent: this.urgent
     }));

     // Old:
     /*
     this.flightService.find(this.from, this.to, this.urgent)
       .subscribe({
         next: (flights) => {
           this.store.dispatch(new flightsLoaded({flights}));
         },
         error: (err) => {
             console.error('error', err);
         }
       });
     */
   }

   ```

   </p>
   </details>

4. Test the application.

5. Use the `Redux DevTools` Chrome plugin to find out which actions are dispatched.

## Bonus: Error Handling

1. Open your `flight-booking.actions.ts` file and add an LoadFlightsError Action with an `HttpErrorResponse` payload:

```typescript
export const loadFlightsError = createAction('[FlightBooking] LoadFlightsError', props<{ err: HttpErrorResponse }>());
```

2. It's probably a good idea to also rename your `flightsLoaded` action to `loadFlightsSuccess` to show the relation of these three actions:

```typescript
export const loadFlights = createAction('[FlightBooking] LoadFlights', props<{ from: string; to: string; urgent: boolean }>());
export const loadFlightsError = createAction('[FlightBooking] LoadFlightsError', props<{ err: HttpErrorResponse }>());
export const loadFlightsSuccess = createAction('[FlightBooking] LoadFlightsSuccess', props<{ flights: Flight[] }>());
```

3. In your `flight-booking.effects.ts`, add an error handler to the switchMap. This error handler should return the `loadFlightError` action.

   <details>
   <summary>Show code</summary>
   <p>

   ```typescript
   loadFlightBookings$ = createEffect(
     (): Observable<FlightBookingActions> =>
       this.actions$.pipe(
         ofType(loadFlights),
         switchMap((action) =>
           this.flightService.find(action.from, action.to, action.urgent).pipe(
             map((flights) => loadFlightsSuccess({ flights })),
             catchError((err) => of(loadFlightsError({ err })))
           )
         )
       )
   );
   ```

   </p>  
   </details>

4. Test your solution. You can simulate an error with the Browser's dev tools by activating offline module in the `Network` tab.
5. Use the Redux Dev Tools to make sure, that the `loadFlightsError` action is send to the store.
