import { createAction, props } from "@ngrx/store";

export const getContentList = createAction(
  "[Content Service] GetContentList",
  props<{ contentList: any[] }>()
);
export const createContent = createAction("[Content Service] CreateContent");
export const updateContent = createAction("[Content Service] UpdateContent");
export const deleteContent = createAction(
  "[Content Service] DeleteContent",
  props<{ contentId: string }>()
);
