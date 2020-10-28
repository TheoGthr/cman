import { Action, createReducer, on } from "@ngrx/store";
import { ContentState } from "../types";

import {
  createContent,
  deleteContent,
  getContentList,
  updateContent,
} from "./content.actions";

export const initialState: ContentState = {
  contentList: [],
  isLoaded: false,
};

const _contentReducer = createReducer(
  initialState,
  on(getContentList, (state, { contentList }) => ({
    ...state,
    contentList: contentList,
    isLoaded: true,
  })),
  on(createContent, (state) => ({
    ...state,
    contentList: [],
  })),
  on(updateContent, (state) => {
    return { ...state, contentList: [] };
  }),
  on(deleteContent, (state, { contentId }) => {
    const index = state.contentList.map((e) => e.id).indexOf(contentId);
    state.contentList.splice(index, 1);
    return { ...state };
  })
);

export function contentReducer(
  state: ContentState | undefined,
  action: Action
) {
  return _contentReducer(state, action);
}
