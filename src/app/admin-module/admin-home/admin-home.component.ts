import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ConfirmDialogComponent } from "src/app/core-module/confirm-dialog/confirm-dialog.component";
import { Model, ModelsState } from "src/app/types";
import * as fromModels from "src/app/ngrx/models/models.selectors";
import { deleteModelPending } from "src/app/ngrx/models/models.actions";

@Component({
  selector: "cman-admin-home",
  styleUrls: ["admin-home.component.scss"],
  template: `
    <div class="container">
      <div class="new-model">
        <button mat-raised-button color="primary" routerLink="/admin/new">
          New model
        </button>
        <button mat-raised-button color="accent" routerLink="/admin/inject">
          Inject data
        </button>
      </div>
      <div class="models">
        <mat-spinner *ngIf="!isModelsListLoaded"></mat-spinner>
        <mat-card *ngIf="errorModels">
          <mat-card-header>
            <mat-card-title>Error</mat-card-title>
            <mat-card-subtitle>Please reload the page</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
        <div class="cards" *ngFor="let model of modelsList">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ model.label }}</mat-card-title>
              <mat-card-subtitle>
                Last update:
                {{ model.lastUpdate?.seconds * 1000 | date: "dd/MM/yy HH:mm" }}
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions class="action-buttons">
              <button
                mat-raised-button
                color="warn"
                (click)="onDelete(model.id)"
              >
                Delete
              </button>
              <button
                mat-raised-button
                color="accent"
                routerLink="/admin/update"
                [queryParams]="{ id: model.id }"
              >
                Update
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
})
export class CmanAdminHomeComponent implements OnInit {
  modelsList: Model[] = [];
  isModelsListLoaded = false;
  errorModels: Error;

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(fromModels.getModelsState)
      .subscribe((state: ModelsState) => {
        this.isModelsListLoaded = state.isLoaded;
        if (this.isModelsListLoaded) {
          this.modelsList = state.models;
        }
        this.errorModels = state.error;
      });
  }

  onDelete(modelId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: "Do you confirm the deletion?",
        confirm: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteModelPending({ modelId }));
      }
    });
  }
}
