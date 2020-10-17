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

const quoteReducer = createReducer(
  initialState,
  on(actions.Load, (state, { payload }) => ({ ...state, quote: payload }))
);

export function reducer(state: State = initialState, action: Action): State {
  return quoteReducer(state, action);
}

export const getQuote = (state: State) => state.quote;
