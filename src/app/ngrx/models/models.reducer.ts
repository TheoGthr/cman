import { Action, createReducer, on } from "@ngrx/store";
import { Model, ModelsState } from "src/app/types";
import {
  loadModelsPending,
  loadModelsSuccess,
  loadModelsFail,
  createModelSuccess,
  createModelFail,
  updateModelSuccess,
  updateModelFail,
  deleteModelSuccess,
  deleteModelFail,
  updateModelPending,
} from "./models.actions";

export const initialState: ModelsState = {
  models: [],
  isLoaded: false,
  isUpdated: false,
  isCreated: false,
  error: null,
};

const _modelsReducer = createReducer(
  initialState,
  on(loadModelsPending, (state) => initialState),
  on(
    loadModelsSuccess,
    (state, { models }) =>
      ({
        models: models,
        isLoaded: true,
        error: null,
      } as ModelsState)
  ),
  on(
    loadModelsFail,
    (state, { error }) =>
      ({
        ...state,
        models: [],
        error,
      } as ModelsState)
  ),

  on(
    createModelSuccess,
    (state, { model }) =>
      ({
        ...state,
        models: state.models.concat([
          { ...model, lastUpdate: { seconds: Date.now(), nanoseconds: 0 } },
        ]),
        error: null,
      } as ModelsState)
  ),
  on(
    createModelFail,
    (state, { error }) =>
      ({
        ...state,
        error,
      } as ModelsState)
  ),

  on(updateModelPending, (state, { model }) => ({
    ...state,
    isUpdated: false,
  })),
  on(updateModelSuccess, (state, { model }) => {
    const idx = state.models.map((e: Model) => e.id).indexOf(model.id);
    state.models[idx] = {
      ...model,
      lastUpdate: { seconds: Date.now(), nanoseconds: 0 },
    };

    return { ...state, error: null, isUpdated: true } as ModelsState;
  }),
  on(updateModelFail, (state, { error }) => {
    return { ...state, error } as ModelsState;
  }),

  on(deleteModelSuccess, (state, { modelId }) => {
    const index = state.models.map((e: Model) => e.id).indexOf(modelId);
    state.models.splice(index, 1);
    return { ...state } as ModelsState;
  }),
  on(deleteModelFail, (state, { error }) => {
    return { ...state, error } as ModelsState;
  })
);

export function modelsReducer(state: ModelsState | undefined, action: Action) {
  return _modelsReducer(state, action);
}
