import { Auth } from './../domain/auth';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from './../../environments/environment';
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';

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
  auth: Auth;
}

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
};

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
};

export const reducersMap: ActionReducerMap<State> = {
  quote: reducers.quote,
  auth: reducers.auth,
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);

const developmentReducer: ActionReducer<State> = compose(
  storeFreeze,
  combineReducers
)(reducers);

export function reducer(state: any = initialState, action: any): State {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getQuotesState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;

export const getQuote = createSelector(getQuotesState, fromQuote.getQuote);
export const getAuth = createSelector(getAuthState, fromAuth.getAuth);

@NgModule({
  imports: [
    StoreModule.forRoot(reducersMap),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
})
export class AppStoreModule {}
