import { createSelector } from "@ngrx/store";
import { ModelsState, AppState } from "src/app/types";

export const selectModels = (state: AppState) => state.models;

export const getModelsState = createSelector(
  selectModels,
  (state: ModelsState) => state
);

export const getAllModels = createSelector(
  selectModels,
  (state: ModelsState) => state.models
);

export const getModelByType = createSelector(
  selectModels,
  (state: ModelsState, type: string) =>
    state.models.find((p) => p.type === type)
);

export const getModelById = createSelector(
  selectModels,
  (state: ModelsState, id: string) => state.models.find((p) => p.id === id)
);

export const getModelsLoaded = createSelector(
  selectModels,
  (state: ModelsState) => state.isLoaded
);

export const getModelUpdated = createSelector(
  selectModels,
  (state: ModelsState) => state.isUpdated
);
