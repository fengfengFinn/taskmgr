import { createReducer, createSelector, on } from '@ngrx/store';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import { Project, TaskList } from '../domain';
import { buildObjFromArr, covertArrToObj } from '../utils/reducer.util';
import * as _ from 'lodash';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskList };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
};

const addList = (state, payload: TaskList) => {
  const taskList = payload;
  if (state.ids.indexOf(taskList.id) > -1) {
    return state;
  }
  const newIds = [...state.ids, taskList.id];
  const newEntities = { ...state.entities, [taskList.id]: taskList };
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: [...state.selectedIds, taskList.id],
  };
};

const delList = (state, payload: TaskList) => {
  const taskList = payload;
  const newIds = state.ids.filter((id) => id !== taskList.id);
  const newEntities = buildObjFromArr(newIds, state.entities);
  const selectedIds = state.selectedIds.filter((id) => id !== taskList.id);
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds,
  };
};

const delListByPrj = (state, payload: Project) => {
  const project = payload;
  const taskListIds = project.taskLists;
  const remaningIds = _.difference(state.ids, taskListIds);
  const remainingEntities = buildObjFromArr(remaningIds, state.entities);
  const selectedIds = _.difference(state.selectedIds, taskListIds);
  return {
    ids: [...remaningIds],
    entities: remainingEntities,
    selectedIds: [...selectedIds],
  };
};

const updateList = (state, payload: TaskList) => {
  const taskList = payload;
  const entities = { ...state.entities, [taskList.id]: taskList };
  return { ...state, entities };
};

const swapOrder = (state, data: { payload: TaskList[] }) => {
  const taskLists = data.payload;
  if (taskLists === null) {
    return state;
  }
  const updated = covertArrToObj(taskLists);
  const updatedEntities = { ...state.entities, ...updated };
  return { ...state, entities: updatedEntities };
};

const loadLists = (state, data: { payload: TaskList[] }) => {
  const taskLists = data.payload;
  // if taskList is null then return the orginal state
  if (taskLists === null) {
    return state;
  }
  const newTaskLists = taskLists.filter(
    (taskList) => !state.entities[taskList.id]
  );
  if (newTaskLists.length === 0) {
    return state;
  }
  const newIds = newTaskLists.map((taskList) => taskList.id);
  const newEntities = covertArrToObj(newTaskLists);
  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedIds: [...newIds],
  };
};

const selectPrj = (state, payload: Project) => {
  const selectedIds = state.ids.filter(
    (id) => state.entities[id].projectId === payload.id
  );
  return { ...state, selectedIds };
};

export const reducer = createReducer(
  initialState,
  on(actions.AddSuccess, addList),
  on(actions.DeleteSuccess, delList),
  on(prjActions.DeleteSuccess, delListByPrj),
  on(actions.UpdateSuccess, updateList),
  on(actions.SwapOrderSuccess, swapOrder),
  on(actions.LoadSuccess, loadLists),
  on(prjActions.Select, selectPrj)
);

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getTaskLists = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map((id) => entities[id]);
  }
);
export const getSelectedIds = (state) => state.selectedIds;
