import { Action, createReducer, on } from "@ngrx/store";
import { Content, ContentState } from "src/app/types";
import {
  loadContentPending,
  loadContentSuccess,
  loadContentFail,
  updateContentPending,
  updateContentSuccess,
  updateContentFail,
  createContentPending,
  createContentSuccess,
  deleteContentSuccess,
  deleteContentFail,
  createContentFail,
} from "./content.actions";

export const initialState: ContentState = {
  content: [],
  type: null,
  isLoaded: false,
  isUpdated: false,
  isCreated: false,
  error: null,
};

const _contentReducer = createReducer(
  initialState,
  on(loadContentPending, (state, { modelType }) => ({
    ...initialState,
    type: modelType,
  })),
  on(
    loadContentSuccess,
    (state, { content }) =>
      ({
        ...state,
        content,
        isLoaded: true,
        error: null,
      } as ContentState)
  ),
  on(
    loadContentFail,
    (state, { error }) =>
      ({
        ...state,
        content: [],
        type: null,
        error,
      } as ContentState)
  ),

  on(createContentPending, (state, { content }) => ({
    ...state,
    isCreated: false,
  })),
  on(createContentSuccess, (state, { content }) => {
    return {
      ...state,
      isCreated: true,
      content: [
        ...state.content,
        { ...content, lastUpdate: { seconds: Date.now(), nanoseconds: 0 } },
      ],
      error: null,
    } as ContentState;
  }),
  on(
    createContentFail,
    (state, { error }) =>
      ({
        ...state,
        isCreated: false,
        error,
      } as ContentState)
  ),

  on(updateContentPending, (state, { content }) => ({
    ...state,
    isUpdated: false,
  })),
  on(updateContentSuccess, (state, { content }) => {
    let contents: Content[] = state.content
      .map((c) => ({ ...c }))
      .map((c) => {
        return c.id === content.id
          ? { ...content, lastUpdate: { seconds: Date.now(), nanoseconds: 0 } }
          : { ...c };
      });

    return {
      ...state,
      content: contents,
      error: null,
      isUpdated: true,
    } as ContentState;
  }),
  on(updateContentFail, (state, { error }) => {
    return { ...state, isUpdated: false, error } as ContentState;
  }),

  on(deleteContentSuccess, (state, { contentId }) => {
    let content = state.content.filter((m: Content) => m.id !== contentId);
    return { ...state, content } as ContentState;
  }),
  on(deleteContentFail, (state, { error }) => {
    return { ...state, error } as ContentState;
  })
);

export function contentReducer(
  state: ContentState | undefined,
  action: Action
) {
  return _contentReducer(state, action);
}
