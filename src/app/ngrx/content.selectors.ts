import { createSelector } from "@ngrx/store";
import { ContentState, AppState } from "../types";

export const selectContent = (state: AppState) => state.content;

export const getContentList = createSelector(
  selectContent,
  (state: ContentState) => state.contentList
);

export const getContentByType = createSelector(
  selectContent,
  (state: ContentState, type: string) =>
    state.contentList.find((p) => p.type === type)
);

export const getContentById = createSelector(
  selectContent,
  (state: ContentState, id: string) =>
    state.contentList.find((p) => p.id === id)
);

export const getContentLoaded = createSelector(
  selectContent,
  (state: ContentState) => state.isLoaded
);
