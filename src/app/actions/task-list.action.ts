import { Project, TaskList } from './../domain';
import { createAction, props } from '@ngrx/store';

export const Add = createAction(
  '[TaskList] Add',
  props<{ payload: TaskList }>()
);

export const AddSuccess = createAction(
  '[TaskList] Add Success',
  props<TaskList>()
);

export const AddFail = createAction(
  '[TaskList] Add Fail',
  props<{ payload: string }>()
);

export const Update = createAction(
  '[TaskList] Update',
  props<{ payload: TaskList }>()
);

export const UpdateSuccess = createAction(
  '[TaskList] Update Success',
  props<TaskList>()
);

export const UpdateFail = createAction(
  '[TaskList] Update Fail',
  props<{ payload: string }>()
);

export const Delete = createAction('[TaskList] Delete', props<TaskList>());

export const DeleteSuccess = createAction(
  '[TaskList] Delete Success',
  props<TaskList>()
);

export const DeleteFail = createAction(
  '[TaskList] Delete Fail',
  props<{ payload: string }>()
);

export const Load = createAction(
  '[TaskList] Load',
  props<{ payload: string }>()
);

export const LoadSuccess = createAction(
  '[TaskList] Load Success',
  props<{ payload: TaskList[] }>()
);

export const LoadFail = createAction(
  '[TaskList] Load Fail',
  props<{ payload: string }>()
);

export const SwapOrder = createAction(
  '[TaskList] SwapOrder',
  props<{ payload: { src: TaskList; target: TaskList } }>()
);

export const SwapOrderSuccess = createAction(
  '[TaskList] SwapOrder Success',
  props<{ payload: TaskList[] }>()
);

export const SwapOrderFail = createAction(
  '[TaskList] SwapOrder Fail',
  props<{ payload: string }>()
);

export const Initialize = createAction(
  '[TaskList] Initialize',
  props<Project>()
);

export const InitializeSuccess = createAction(
  '[TaskList] Initialize Success',
  props<Project>()
);

export const InitializeFail = createAction(
  '[TaskList] Initialize Fail',
  props<{ payload: string }>()
);
