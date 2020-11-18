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
  createModelPending,
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
        ...state,
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

  on(createModelPending, (state, { model }) => ({
    ...state,
    isCreated: false,
  })),
  on(createModelSuccess, (state, { model }) => {
    return {
      ...state,
      isCreated: true,
      models: [
        ...state.models,
        { ...model, lastUpdate: { seconds: Date.now(), nanoseconds: 0 } },
      ],
      error: null,
    } as ModelsState;
  }),
  on(
    createModelFail,
    (state, { error }) =>
      ({
        ...state,
        isCreated: false,
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
    return { ...state, isUpdated: false, error } as ModelsState;
  }),

  on(deleteModelSuccess, (state, { modelId }) => {
    let models = state.models.filter((m: Model) => m.id !== modelId);
    return { ...state, models } as ModelsState;
  }),
  on(deleteModelFail, (state, { error }) => {
    return { ...state, error } as ModelsState;
  })
);

export function modelsReducer(state: ModelsState | undefined, action: Action) {
  return _modelsReducer(state, action);
}
