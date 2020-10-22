import { Component, OnChanges, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ConfirmDialogComponent } from "src/app/core-module/confirm-dialog/confirm-dialog.component";
import { deleteModel } from "src/app/ngrx/models.actions";
import { ModelsService } from "src/app/services/models.service";
import { Model } from "src/app/types";
import * as fromModels from "../../ngrx/models.selectors";

@Component({
  selector: "cman-admin-home",
  styleUrls: ["admin-home.component.scss"],
  template: `
    <div class="container">
      <div class="new-model">
        <button mat-raised-button color="primary" routerLink="/admin/new">
          New model
        </button>
      </div>
      <div class="models">
        <mat-spinner *ngIf="!isModelsListLoaded"></mat-spinner>
        <div class="cards" *ngFor="let model of modelsList">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ model.label | titlecase }}</mat-card-title>
              <mat-card-subtitle>
                Last update:
                {{ model.lastUpdate.seconds * 1000 | date: "dd/MM/yy HH:mm" }}
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
              <button mat-raised-button color="primary" (click)="([model.id])">
                Update
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
})
export class CmanAdminHomeComponent implements OnInit, OnChanges {
  modelsList: Model[];
  isModelsListLoaded: boolean = false;

  constructor(
    public dialog: MatDialog,
    private modelsService: ModelsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(fromModels.getModelsLoaded).subscribe((isLoaded) => {
      this.isModelsListLoaded = isLoaded;
    });
    this.store.select(fromModels.getModelsList).subscribe((modelsList) => {
      this.modelsList = modelsList;
    });
  }

  ngOnChanges(): void {
    this.store.select(fromModels.getModelsLoaded).subscribe((isLoaded) => {
      this.isModelsListLoaded = isLoaded;
    });
    this.store.select(fromModels.getModelsList).subscribe((modelsList) => {
      this.modelsList = modelsList;
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
        this.modelsService
          .deleteModel(modelId)
          .then(() => {
            this.store.dispatch(deleteModel({ modelId }));
          })
          .catch((e) => console.log(e));
      }
    });
  }
}
