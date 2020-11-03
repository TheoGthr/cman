import { createAction, props } from "@ngrx/store";
import { Model } from "../../types";

export const loadModelsPending = createAction("[Model Service] Load Models");
export const loadModelsSuccess = createAction(
  "[Model Service] Load Models Success",
  props<{ models: Model[] }>()
);
export const loadModelsError = createAction(
  "[Model Service] Load Models Error",
  props<{ error: any }>()
);
export const createModel = createAction("[Model Service] CreateModel");
export const updateModel = createAction("[Model Service] UpdateModel");
export const deleteModel = createAction(
  "[Model Service] DeleteModel",
  props<{ modelId: string }>()
);
