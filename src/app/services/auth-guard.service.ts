import { Injectable } from '@angular/core';
import * as fromRoot from '../reducers/index';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store$: Store<fromRoot.State>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true);
  }

  checkAuth(): Observable<boolean> {
    return this.store$.select(fromRoot.getAuth).pipe(
      map((auth) => {
        const result = auth.token !== undefined && auth.token !== null;
        if (!result) {
          this.router.navigate(['/login']);
        }
        return result;
      }),
      defaultIfEmpty(false)
    );
  }
}
