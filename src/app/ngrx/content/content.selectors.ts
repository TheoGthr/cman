import { createSelector } from "@ngrx/store";
import { ContentState, AppState } from "src/app/types";

export const selectContent = (state: AppState) => state.content;

export const getContentState = createSelector(
  selectContent,
  (state: ContentState) => state
);

export const getContentList = createSelector(
  selectContent,
  (state: ContentState) => state.content
);

export const getContentByType = createSelector(
  selectContent,
  (state: ContentState, type: string) =>
    state.content.find((p) => p.type === type)
);

export const getContentById = createSelector(
  selectContent,
  (state: ContentState, id: string) => state.content.find((p) => p.id === id)
);

export const getContentLoaded = createSelector(
  selectContent,
  (state: ContentState) => state.isLoaded
);

export const getContentCreated = createSelector(
  selectContent,
  (state: ContentState) => state.isCreated
);

export const getContentUpdated = createSelector(
  selectContent,
  (state: ContentState) => state.isUpdated
);
