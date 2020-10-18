import { createReducer, on, props, Action } from '@ngrx/store';
import { Quote } from './../domain/quote';
import * as actions from './../actions/quote.action';
import { Actions } from '@ngrx/store-devtools/src/reducer';

export interface State {
  quote: Quote;
}

export const initialState: State = {
  quote: {
    id: '-1',
    cn: 'initial',
    en: 'initial',
    pic: '/assets/img/quotes/0.jpg',
  },
};

export const reducer = createReducer(
  initialState,
  on(actions.LoadSuccess, (state, { payload }) => ({
    ...state,
    quote: payload,
  })),
  on(actions.LoadFail)
);

export const getQuote = (state: State) => state.quote;
