import { createAction, props } from '@ngrx/store';

export const SwitchTheme = createAction(
  '[THEME] Switch Theme',
  props<{ payload: boolean }>()
);
