import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from './../../environments/environment';
import * as fromQuote from './quote.reducer';

import { NgModule } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  createSelector,
  StoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core';

export interface State {
  quote: fromQuote.State;
}

const reducers = {
  quote: fromQuote.reducer,
};

export const reducersMap: ActionReducerMap<State> = {
  quote: reducers.quote,
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);

const developmentReducer: ActionReducer<State> = compose(
  storeFreeze,
  combineReducers
)(reducers);

const initialState: State = {
  quote: fromQuote.initialState,
};

export function reducer(state: any = initialState, action: any): State {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getQuotesState = (state: State) => state.quote;

export const getQuote = createSelector(getQuotesState, fromQuote.getQuote);

@NgModule({
  imports: [
    StoreModule.forRoot(reducersMap),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
})
export class AppStoreModule {}
