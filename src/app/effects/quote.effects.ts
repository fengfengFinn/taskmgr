import { QuoteService } from './../services/quote.service';
import { map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from '../actions/quote.action';
import { of } from 'rxjs';

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions, private quoteService: QuoteService) {}

  @Effect()
  quote$ = this.actions$.pipe(
    ofType(actions.Load),
    switchMap(() =>
      this.quoteService.getQuote().pipe(
        map((quote) => actions.LoadSuccess({ payload: quote })),
        catchError((err) =>
          of(actions.LoadFail({ payload: JSON.stringify(err) }))
        )
      )
    )
  );
}
