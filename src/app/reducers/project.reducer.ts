import { Project } from './../domain/project';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/project.action';

export interface State {
  ids: string[];
  entities: { [id: string]: Project };
  selectedId: string | null;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const addProject = (state: State, payload: Project) => {
  const project = payload;
  if (state.entities[project.id]) {
    return state;
  }

  const idsResult = [...state.ids, project.id];
  const entitiesResult = { ...state.entities, [project.id]: project };
  return { ...state, ids: idsResult, entities: entitiesResult };
};

const updateProject = (state: State, payload: Project) => {
  const project = payload;

  const entitiesResult = { ...state.entities, [project.id]: project };
  return { ...state, entities: entitiesResult };
};

export const reducer = createReducer(
  initialState,
  on(actions.Select, (state, payload) => ({
    ...state,
    selectedId: payload.id,
  })),
  on(actions.AddSuccess, addProject),
  on(actions.UpdateSuccess, updateProject)
);
