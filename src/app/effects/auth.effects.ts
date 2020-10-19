import { AuthService } from './../services/auth.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from '../actions/auth.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private router: Router
  ) {}

  @Effect()
  auth$ = this.actions$.pipe(
    ofType(actions.Login),
    switchMap((val) => {
      console.log(val);
      return this.service.login(val.email, val.password).pipe(
        map((auth) => actions.LoginSuccess(auth)),
        catchError((err: Error) => of(actions.LoginFail(err)))
      );
    })
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(actions.Register),
    switchMap((val) =>
      this.service.register(val).pipe(
        map((auth) => actions.RegisterSuccess(auth)),
        catchError((err: Error) => of(actions.RegisterFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  navigateHome$ = this.actions$.pipe(
    ofType(actions.LoginSuccess),
    tap(() => {
      this.router.navigate(['/project']);
    })
  );

  @Effect({ dispatch: false })
  registerAndHome$ = this.actions$.pipe(
    ofType(actions.RegisterSuccess),
    tap(() => {
      this.router.navigate(['/project']);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(actions.Logout),
    tap(() => this.router.navigate(['/']))
  );
}
