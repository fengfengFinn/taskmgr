import { Quote } from './../domain/quote';
import { createAction, props } from '@ngrx/store';

export const Load = createAction('[Quote] Load');

export const LoadSuccess = createAction(
  '[Quote] Load Success',
  props<{ payload: Quote }>()
);
export const LoadFail = createAction(
  '[Quote] Load Fail',
  props<{ payload: string }>()
);
