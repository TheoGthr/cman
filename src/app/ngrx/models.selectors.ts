import { createSelector } from "@ngrx/store";
import { ModelsState, AppState } from "../types";

export const selectModels = (state: AppState) => state.models;

export const getModelsList = createSelector(
  selectModels,
  (state: ModelsState) => state.modelsList
);

export const getModelByType = createSelector(
  selectModels,
  (state: ModelsState, type: string) =>
    state.modelsList.find((p) => p.type === type)
);

export const getModelById = createSelector(
  selectModels,
  (state: ModelsState, id: string) => state.modelsList.find((p) => p.id === id)
);

export const getModelsLoaded = createSelector(
  selectModels,
  (state: ModelsState) => state.isLoaded
);
