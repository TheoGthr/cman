import { createAction, props } from "@ngrx/store";
import { Model } from "../types";

export const getModels = createAction(
  "[Model Service] GetModels",
  props<{ modelsList: Model[] }>()
);
export const createModel = createAction(
  "[Model Service] CreateModel",
  props<{ model: Model }>()
);
export const updateModel = createAction(
  "[Model Service] UpdateModel",
  props<{ model: Model }>()
);
export const deleteModel = createAction(
  "[Model Service] DeleteModel",
  props<{ modelId: string }>()
);
