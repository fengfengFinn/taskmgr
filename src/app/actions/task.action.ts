import { Task, TaskList } from './../domain';
import { createAction, props } from '@ngrx/store';

export const Add = createAction('[Task] Add', props<Task>());

export const AddSuccess = createAction('[Task] Add Success', props<Task>());

export const AddFail = createAction(
  '[Task] Add Fail',
  props<{ payload: string }>()
);

export const Update = createAction('[Task] Update', props<Task>());

export const UpdateSuccess = createAction(
  '[Task] Update Success',
  props<Task>()
);

export const UpdateFail = createAction(
  '[Task] Update Fail',
  props<{ payload: string }>()
);

export const Delete = createAction('[Task] Delete', props<Task>());

export const DeleteSuccess = createAction(
  '[Task] Delete Success',
  props<Task>()
);

export const DeleteFail = createAction(
  '[Task] Delete Fail',
  props<{ payload: string }>()
);

export const LoadInLists = createAction(
  '[Task] Load In Lists',
  props<{ payload: TaskList[] }>()
);

export const LoadInListsSuccess = createAction(
  '[Task] Load In Lists Success',
  props<{ payload: Task[] }>()
);

export const LoadInListsFail = createAction(
  '[Task] Load In Lists Fail',
  props<{ payload: string }>()
);

export const MoveAll = createAction(
  '[Task] Move All',
  props<{ payload: { srcListId: string; targetListId: string } }>()
);

export const MoveAllSuccess = createAction(
  '[Task] Move All Success',
  props<{ payload: Task[] }>()
);

export const MoveAllFail = createAction(
  '[Task] Move All Fail',
  props<{ payload: string }>()
);

export const Move = createAction(
  '[Task] Move',
  props<{ payload: { taskId: string; taskListId: string } }>()
);

export const MoveSuccess = createAction('[Task] Move Success', props<Task>());

export const MoveFail = createAction(
  '[Task] Move Fail',
  props<{ payload: string }>()
);

export const Complete = createAction('[Task] Complete', props<Task>());

export const CompleteSuccess = createAction(
  '[Task] Complete Success',
  props<Task>()
);

export const CompleteFail = createAction(
  '[Task] Complete Fail',
  props<{ payload: string }>()
);
