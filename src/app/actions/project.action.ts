import { User } from './../domain/user';
import { Project } from './../domain/project';
import { createAction, props } from '@ngrx/store';

export const Add = createAction('[Project] Add', props<Project>());

export const AddSuccess = createAction(
  '[Project] Add Success',
  props<Project>()
);
export const AddFail = createAction(
  '[Project] Add Fail',
  props<{ payload: string }>()
);
export const Update = createAction('[Project] Update', props<Project>());
export const UpdateSuccess = createAction(
  '[Project] Update Success',
  props<Project>()
);
export const UpdateFail = createAction(
  '[Project] Update Fail',
  props<{ payload: string }>()
);
export const UpdateLists = createAction(
  '[Project] Update Lists',
  props<Project>()
);
export const UpdateListsSuccess = createAction(
  '[Project] Update Lists Success',
  props<Project>()
);
export const UpdateListsFail = createAction(
  '[Project] Update Lists Fail',
  props<{ payload: string }>()
);

export const Delete = createAction('[Project] Delete', props<Project>());
export const DeleteSuccess = createAction(
  '[Project] Delete Success',
  props<Project>()
);
export const DeleteFail = createAction(
  '[Project] Delete Fail',
  props<{ payload: string }>()
);

export const Load = createAction('[Project] Load', props<{ payload: any }>());
export const LoadSuccess = createAction(
  '[Project] Load Success',
  props<{ payload: Project[] }>()
);
export const LoadFail = createAction(
  '[Project] Load Fail',
  props<{ payload: string }>()
);

export const Invite = createAction(
  '[Project] Invite',
  props<{ payload: { projectId: string; members: User[] } }>()
);
export const InviteSuccess = createAction(
  '[Project] Invite Success',
  props<Project>()
);
export const InviteFail = createAction(
  '[Project] Invite Fail',
  props<{ payload: string }>()
);

export const Select = createAction('[Project] Select Fail', props<Project>());
