import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, exhaustMap } from "rxjs/operators";
import { ContentService } from "src/app/services/content.service";
import {
  loadContentPending,
  loadContentSuccess,
  loadContentFail,
  updateContentPending,
  updateContentSuccess,
  updateContentFail,
  createContentPending,
  createContentSuccess,
  deleteContentPending,
  deleteContentSuccess,
  deleteContentFail,
  createContentFail,
} from "./content.actions";

@Injectable()
export class ContentEffects {
  constructor(
    private actions$: Actions,
    private contentService: ContentService,
    private router: Router
  ) {}

  loadContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContentPending),
      exhaustMap((action) =>
        this.contentService.getContentByType(action.modelType).pipe(
          map((content) => loadContentSuccess({ content })),
          catchError((error) => of(loadContentFail({ error })))
        )
      )
    )
  );

  createContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createContentPending),
      exhaustMap((action) =>
        this.contentService
          .createContent(action.content)
          .then((doc) => {
            let content = { ...action.content, id: doc.id };
            return createContentSuccess({ content });
          })
          .catch((error) => createContentFail({ error }))
      )
    )
  );

  updateContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateContentPending),
      exhaustMap((action) =>
        this.contentService
          .updateContent(action.content)
          .then(() => {
            const { lastUpdate, ...content } = action.content;
            return updateContentSuccess({ content });
          })
          .catch((error) => updateContentFail({ error }))
      )
    )
  );

  deleteContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContentPending),
      exhaustMap((action) =>
        this.contentService
          .deleteContent(action.contentId)
          .then(() => {
            return deleteContentSuccess({ contentId: action.contentId });
          })
          .catch((error) => deleteContentFail({ error }))
      )
    )
  );
}
