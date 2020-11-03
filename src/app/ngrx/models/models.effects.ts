import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, exhaustMap } from "rxjs/operators";
import { ModelsService } from "src/app/services/models.service";
import {
  loadModelsPending,
  loadModelsSuccess,
  loadModelsError,
} from "./models.actions";

@Injectable()
export class ModelsEffects {
  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadModelsPending),
      exhaustMap(() =>
        this.modelsService.getModels().pipe(
          map((models) => loadModelsSuccess({ models })),
          catchError((error) => of(loadModelsError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private modelsService: ModelsService
  ) {}
}
