import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, exhaustMap } from "rxjs/operators";
import { ModelsService } from "src/app/services/models.service";
import {
  loadModelsPending,
  loadModelsSuccess,
  loadModelsFail,
  updateModelPending,
  updateModelSuccess,
  updateModelFail,
  createModelPending,
  createModelSuccess,
  deleteModelPending,
  deleteModelSuccess,
  deleteModelFail,
  createModelFail,
} from "./models.actions";

@Injectable()
export class ModelsEffects {
  constructor(
    private actions$: Actions,
    private modelsService: ModelsService,
    private router: Router
  ) {}

  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadModelsPending),
      exhaustMap(() =>
        this.modelsService.getModels().pipe(
          map((models) => loadModelsSuccess({ models })),
          catchError((error) => of(loadModelsFail({ error })))
        )
      )
    )
  );

  createModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createModelPending),
      exhaustMap((action) =>
        this.modelsService
          .createModel(action.model)
          .then((doc) => {
            let model = { ...action.model, id: doc.id };
            return createModelSuccess({ model });
          })
          .catch((error) => createModelFail({ error }))
      )
    )
  );

  updateModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateModelPending),
      exhaustMap((action) =>
        this.modelsService
          .updateModel(action.model)
          .then(() => {
            return updateModelSuccess({ model: action.model });
          })
          .catch((error) => updateModelFail({ error }))
      )
    )
  );

  deleteModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteModelPending),
      exhaustMap((action) =>
        this.modelsService
          .deleteModel(action.modelId)
          .then(() => {
            return deleteModelSuccess({ modelId: action.modelId });
          })
          .catch((error) => deleteModelFail({ error }))
      )
    )
  );
}
