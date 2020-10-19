import { Project, Task, TaskList, User } from './../domain';
import { createAction, props } from '@ngrx/store';

export interface UserProject {
  user: User;
  projectId: string;
}

export interface UserTask {
  user: User;
  taskId: string;
}

export const AddUserProject = createAction(
  '[User] Add User Project',
  props<UserProject>()
);

export const AddUserProjectSuccess = createAction(
  '[User] Add User Project Success',
  props<User>()
);

export const AddUserProjectFail = createAction(
  '[User] Add User Project Fail',
  props<{ payload: string }>()
);

export const RemoveUserProject = createAction(
  '[User] Remove User Project',
  props<UserProject>()
);

export const RemoveUserProjectSuccess = createAction(
  '[User] Remove User Project Success',
  props<User>()
);

export const RemoveUserProjectFail = createAction(
  '[User] Remove User Project Fail',
  props<{ payload: string }>()
);

export const BatchUpdateUserProject = createAction(
  '[User] Batch Update User Project',
  props<Project>()
);

export const BatchUpdateUserProjectSuccess = createAction(
  '[User] Batch Update User Project Success',
  props<{ payload: User[] }>()
);

export const BatchUpdateUserProjectFail = createAction(
  '[User] Batch Update User Project Fail',
  props<{ payload: string }>()
);

export const SearchUsers = createAction(
  '[User] Search Users',
  props<{ payload: string }>()
);

export const SearchUsersSuccess = createAction(
  '[User] Search Users Success',
  props<{ payload: User[] }>()
);

export const SearchUsersFail = createAction(
  '[User] Search Users Fail',
  props<{ payload: string }>()
);

export const LoadUsersByProject = createAction(
  '[User] Load Users By Project',
  props<{ payload: string }>()
);

export const LoadUsersByProjectSuccess = createAction(
  '[User] Load Users By Project Success',
  props<{ payload: User[] }>()
);

export const LoadUsersByProjectFail = createAction(
  '[User] Load Users By Project Fail',
  props<{ payload: string }>()
);
