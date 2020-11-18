import { createAction, props } from "@ngrx/store";
import { Content } from "../../types";

export const loadContentPending = createAction(
  "[Content Service] Load Content Pending",
  props<{ modelType: string }>()
);
export const loadContentSuccess = createAction(
  "[Content Service] Load Content Success",
  props<{ content: Content[] }>()
);
export const loadContentFail = createAction(
  "[Content Service] Load Content Fail",
  props<{ error: any }>()
);

export const createContentPending = createAction(
  "[Content Service] Create Content",
  props<{ content: Content }>()
);
export const createContentSuccess = createAction(
  "[Content Service] Create Content Success",
  props<{ content: Content }>()
);
export const createContentFail = createAction(
  "[Content Service] Create Content Fail",
  props<{ error: any }>()
);

export const updateContentPending = createAction(
  "[Content Service] Update Content Pending",
  props<{ content: Content }>()
);
export const updateContentSuccess = createAction(
  "[Content Service] Update Content Success",
  props<{ content: Content }>()
);
export const updateContentFail = createAction(
  "[Content Service] Update Content Fail",
  props<{ error: any }>()
);

export const deleteContentPending = createAction(
  "[Content Service] Delete Content Pending",
  props<{ contentId: string }>()
);
export const deleteContentSuccess = createAction(
  "[Content Service] Delete Content Success",
  props<{ contentId: string }>()
);
export const deleteContentFail = createAction(
  "[Content Service] Delete Content Fail",
  props<{ error: any }>()
);
