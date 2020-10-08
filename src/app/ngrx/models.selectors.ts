import { createSelector } from "@ngrx/store";
import { ModelsState, AppState } from "../types";

export const selectModels = (state: AppState) => state.models;

export const getModelsList = createSelector(
  selectModels,
  (state: ModelsState) => state.modelsList
);

export const getModelsLoaded = createSelector(
  selectModels,
  (state: ModelsState) => state.isLoaded
);
