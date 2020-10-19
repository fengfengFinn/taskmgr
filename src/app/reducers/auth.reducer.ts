import { Auth } from './../domain/auth';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {};

export const reducer = createReducer(
  initialState,
  on(actions.LoginSuccess, (_, payload) => ({ ...payload })),

  on(actions.RegisterSuccess, (_, payload) => ({ ...payload })),

  on(actions.LoginFail, (_, payload) => ({ err: payload })),

  on(actions.RegisterFail, (_, payload) => ({ err: payload })),

  on(actions.Logout, () => ({}))
);
