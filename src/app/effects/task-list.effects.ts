import { TaskListService } from './../services/task-list.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskListEffects {
  constructor(
    private actions$: Actions,
    private service$: TaskListService,
    private store$: Store<fromRoot.State>
  ) {}

  @Effect()
  loadTaskLists$ = this.actions$.pipe(
    ofType(actions.Load),
    switchMap(({ payload }) =>
      this.service$.get(payload).pipe(
        map((taskLists) => actions.LoadSuccess({ payload: taskLists })),
        catchError((err) =>
          of(actions.LoadFail({ payload: JSON.stringify(err) }))
        )
      )
    )
  );

  @Effect()
  addTaskLists$ = this.actions$.pipe(
    ofType(actions.Add),
    switchMap((val) => {
      console.log('here');
      console.log(val.payload);
      return this.service$.add(val.payload).pipe(
        map((result) => actions.AddSuccess(result)),
        catchError((err) => of(actions.AddFail({ payload: err })))
      );
    })
  );

  @Effect()
  updateTaskLists$ = this.actions$.pipe(
    ofType(actions.Update),
    switchMap((val) =>
      this.service$.update(val.payload).pipe(
        map((result) => actions.UpdateSuccess(result)),
        catchError((err) =>
          of(actions.UpdateFail({ payload: JSON.stringify(err) }))
        )
      )
    )
  );

  @Effect()
  deleteTaskLists$ = this.actions$.pipe(
    ofType(actions.Delete),
    switchMap((taskList) =>
      this.service$.delete(taskList).pipe(
        map((result) => actions.DeleteSuccess(result)),
        catchError((err) =>
          of(actions.DeleteFail({ payload: JSON.stringify(err) }))
        )
      )
    )
  );

  //   @Effect()
  //   removeTasksInList$: Observable<Action> = this.actions$
  //     .ofType(actions.ActionTypes.DELETE_SUCCESS)
  //     .map(toPayload)
  //     .switchMap((taskList: TaskList) => {
  //       return this.store$.select(fromRoot.getTasks)
  //         .switchMap((tasks: Task[]) =>
  //           Observable.from(tasks.filter(t => t.taskListId === taskList.id)))
  //         .map(task => new taskActions.DeleteTaskAction(task));
  //     });
}
