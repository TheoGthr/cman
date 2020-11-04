import { createAction, props } from "@ngrx/store";
import { Model } from "../../types";

export const loadModelsPending = createAction(
  "[Model Service] Load Models Pending"
);
export const loadModelsSuccess = createAction(
  "[Model Service] Load Models Success",
  props<{ models: Model[] }>()
);
export const loadModelsFail = createAction(
  "[Model Service] Load Models Fail",
  props<{ error: any }>()
);

export const createModelPending = createAction(
  "[Model Service] Create Model",
  props<{ model: Model }>()
);
export const createModelSuccess = createAction(
  "[Model Service] Create Model Success",
  props<{ model: Model }>()
);
export const createModelFail = createAction(
  "[Model Service] Create Model Fail",
  props<{ error: any }>()
);

export const updateModelPending = createAction(
  "[Model Service] Update Model Pending",
  props<{ model: Model }>()
);
export const updateModelSuccess = createAction(
  "[Model Service] Update Model Success",
  props<{ model: Model }>()
);
export const updateModelFail = createAction(
  "[Model Service] Update Model Fail",
  props<{ error: any }>()
);

export const deleteModelPending = createAction(
  "[Model Service] Delete Model Pending",
  props<{ modelId: string }>()
);
export const deleteModelSuccess = createAction(
  "[Model Service] Delete Model Success",
  props<{ modelId: string }>()
);
export const deleteModelFail = createAction(
  "[Model Service] Delete Model Fail",
  props<{ error: any }>()
);
