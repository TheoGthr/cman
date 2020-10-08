import { Action, createReducer, on } from "@ngrx/store";
import { ModelsState } from "../types";

import {
  createModel,
  deleteModel,
  getModels,
  updateModel,
} from "./models.actions";

export const initialState: ModelsState = {
  modelsList: [],
  isLoaded: false,
};

const _modelsReducer = createReducer(
  initialState,
  on(getModels, (state, { modelsList }) => ({
    ...state,
    modelsList: modelsList,
    isLoaded: true,
  })),
  on(createModel, (state, { model }) => ({
    ...state,
    modelsList: state.modelsList.concat(model),
  })),
  on(updateModel, (state) => ({ ...state, modelsList: [] })),
  on(deleteModel, (state) => ({ ...state, modelsList: [] }))
);

export function modelsReducer(state: ModelsState | undefined, action: Action) {
  return _modelsReducer(state, action);
}
