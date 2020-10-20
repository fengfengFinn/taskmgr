import { Router } from '@angular/router';
import { ProjectService } from './../services/project.service';
import {
  map,
  switchMap,
  withLatestFrom,
  catchError,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from '../actions/project.action';
import * as taskListActions from '../actions/task-list.action';
import * as fromRoot from '../reducers/index';
import { of } from 'rxjs';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private service$: ProjectService,
    private router: Router
  ) {}

  @Effect()
  loadProjects$ = this.actions$.pipe(
    ofType(actions.Load),
    withLatestFrom(this.store$.select(fromRoot.getAuth)),
    switchMap(([_, auth]) =>
      this.service$.get(auth?.userId).pipe(
        map((projects) => actions.LoadSuccess({ payload: projects })),
        catchError((err) =>
          of(actions.LoadFail({ payload: JSON.stringify(err) }))
        )
      )
    )
  );

  @Effect()
  addProjects$ = this.actions$.pipe(
    ofType(actions.Add),
    withLatestFrom(this.store$.select(fromRoot.getAuth)),
    switchMap(([project, auth]) => {
      const added = { ...project, members: [`${auth?.userId}`] };
      return this.service$.add(added).pipe(
        map((val) => actions.AddSuccess(val)),
        catchError((err) =>
          of(actions.AddFail({ payload: JSON.stringify(err) }))
        )
      );
    })
  );

  @Effect()
  updateProjects$ = this.actions$.pipe(
    ofType(actions.Update),
    switchMap((project) => {
      return this.service$.update(project).pipe(
        map((val) => actions.UpdateSuccess(val)),
        catchError((err) =>
          of(actions.UpdateFail({ payload: JSON.stringify(err) }))
        )
      );
    })
  );

  @Effect()
  deleteProjects$ = this.actions$.pipe(
    ofType(actions.Delete),
    switchMap((project) => {
      return this.service$.delete(project).pipe(
        map((val) => actions.DeleteSuccess(val)),
        catchError((err) =>
          of(actions.DeleteFail({ payload: JSON.stringify(err) }))
        )
      );
    })
  );

  @Effect()
  invite$ = this.actions$.pipe(
    ofType(actions.Invite),
    switchMap(({ payload: { projectId, members } }) => {
      return this.service$.invite(projectId, members).pipe(
        map((project) => actions.UpdateSuccess(project)),
        catchError((err) =>
          of(actions.InviteFail({ payload: JSON.stringify(err) }))
        )
      );
    })
  );

  @Effect()
  selectProjects$ = this.actions$.pipe(
    ofType(actions.Select),
    tap((val) => this.router.navigate([`/tasklists/${val.payload.id}`])),
    switchMap((val) => of(taskListActions.Load({ payload: val.payload.id })))
  );
}
