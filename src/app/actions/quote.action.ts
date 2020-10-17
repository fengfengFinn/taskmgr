import { Quote } from './../domain/quote';
import { createAction, props } from '@ngrx/store';

export const Load = createAction('[Quote] Load', props<{ payload: Quote }>());
