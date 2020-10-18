import { User } from './../domain/user';
import { Auth } from './../domain/auth';
import { createAction, props } from '@ngrx/store';

export const Login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const LoginSuccess = createAction('[Auth] Login Success', props<Auth>());

export const LoginFail = createAction('[Auth] Login Fail', props<Error>());

export const Register = createAction('[Auth] Register', props<User>());

export const RegisterSuccess = createAction(
  '[Auth] Register Success',
  props<Auth>()
);

export const RegisterFail = createAction(
  '[Auth] Register Fail',
  props<Error>()
);

export const Logout = createAction('[Auth] Logout');
