import { Project } from './../domain/project';
import { createReducer, createSelector, on } from '@ngrx/store';
import * as actions from '../actions/project.action';
import * as _ from 'lodash';

export interface State {
  ids: string[];
  entities: { [id: string]: Project };
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const addProject = (state: State, payload: Project) => {
  const project = payload;
  if (state.entities[project.id]) {
    return state;
  }

  const newIds = [...state.ids, project.id];
  const newEntities = { ...state.entities, [project.id]: project };
  return { ...state, ids: newIds, entities: newEntities };
};

const updateProject = (state: State, payload: Project) => {
  const project = payload;

  if (state.entities[project.id]) {
    return state;
  }
  const newEntities = { ...state.entities, [project.id]: project };
  return { ...state, entities: newEntities };
};

const delProject = (state: State, payload: Project): State => {
  const project = payload;
  const newIds = state.ids.filter((id) => id !== project.id);
  const newEntities = newIds.reduce(
    (entities, id) => ({ ...entities, [id]: state.entities[id] }),
    {}
  );

  return {
    ids: newIds,
    entities: newEntities,
    selectedId: null,
  };
};

const loadProjects = (state: State, data: { payload: Project[] }): State => {
  const projects = data.payload;
  const incomingIds = projects.map((p) => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(projects)
    .keyBy((v) => v.id)
    .mapValues((v) => v)
    .value();
  const newEntities = newIds.reduce(
    (entities, id) => ({ ...entities, [id]: incomingEntities[id] }),
    {}
  );

  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedId: null,
  };
};

export const reducer = createReducer(
  initialState,
  on(actions.Select, (state, payload) => ({
    ...state,
    selectedId: payload.id,
  })),
  on(actions.AddSuccess, addProject),
  on(actions.InviteSuccess, updateProject),
  on(actions.UpdateSuccess, updateProject),
  on(actions.Delete, delProject),
  on(actions.LoadSuccess, loadProjects)
);

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getAll = createSelector(getIds, getEntities, (ids, entities) =>
  ids.map((id) => entities[id])
);
