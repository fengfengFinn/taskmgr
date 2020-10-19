import { Auth } from './../domain/auth';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from './../../environments/environment';
import * as fromQuote from './quote.reducer';
import * as fromProject from './project.reducer';
import * as fromAuth from './auth.reducer';
import * as fromTaskLists from './task-list.reducer';

import { NgModule } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  createSelector,
  StoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze/src';

export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
  taskLists: fromTaskLists.State;
}

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  taskLists: fromTaskLists.reducer,
};

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState,
  taskLists: fromTaskLists.initialState,
};

export const reducersMap: ActionReducerMap<State> = {
  quote: reducers.quote,
  auth: reducers.auth,
  projects: reducers.projects,
  taskLists: reducers.taskLists,
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

const getQuotesState = (state: State) => state.quote;
const getAuthState = (state: State) => state.auth;
const getProjectsState = (state: State) => state.projects;
export const getTaskListsState = (state: State) => state.taskLists;

export const getQuote = createSelector(getQuotesState, fromQuote.getQuote);
export const getAuth = getAuthState;
export const getProjects = createSelector(getProjectsState, fromProject.getAll);

export const getTaskLists = createSelector(
  getTaskListsState,
  fromTaskLists.getTaskLists
);
export const getTaskListEntities = createSelector(
  getTaskListsState,
  fromTaskLists.getEntities
);
export const getTaskListSelectedIds = createSelector(
  getTaskListsState,
  fromTaskLists.getSelectedIds
);

export const getMaxListOrder = createSelector(
  getTaskListEntities,
  getTaskListSelectedIds,
  (entities, ids) => {
    const orders: number[] = ids.map((id) => entities[id].order);
    return orders.sort()[orders.length - 1];
  }
);

@NgModule({
  imports: [
    StoreModule.forRoot(reducersMap),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
})
export class AppStoreModule {}
