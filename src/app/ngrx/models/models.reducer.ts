import { Action, createReducer, on } from "@ngrx/store";
import { Model, ModelsState } from "src/app/types";

import {
  createModel,
  deleteModel,
  loadModelsSuccess,
  updateModel,
} from "./models.actions";

export const initialState: ModelsState = {
  models: [],
  isLoaded: false,
};

const _modelsReducer = createReducer(
  initialState,
  on(
    loadModelsSuccess,
    (state, { models }) =>
      ({
        ...state,
        models: models,
        isLoaded: true,
      } as ModelsState)
  ),
  on(
    createModel,
    (state) =>
      ({
        ...state,
        models: [],
      } as ModelsState)
  ),
  on(updateModel, (state) => {
    return { ...state, models: [] } as ModelsState;
  }),
  on(deleteModel, (state, { modelId }) => {
    const index = state.models.map((e: Model) => e.id).indexOf(modelId);
    state.models.splice(index, 1);
    return { ...state } as ModelsState;
  })
);

export function modelsReducer(state: ModelsState | undefined, action: Action) {
  return _modelsReducer(state, action);
}
