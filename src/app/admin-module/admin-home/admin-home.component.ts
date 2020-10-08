import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
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
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>{{ model.type | titlecase }}</mat-card-title>
              <mat-card-subtitle
                >Last update:
                {{
                  model.lastUpdate.toDate() | date: "dd/MM/yy HH:mm"
                }}</mat-card-subtitle
              >
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
export class CmanAdminHomeComponent implements OnInit {
  modelsList: Model[];
  isModelsListLoaded: boolean = false;

  constructor(private modelsService: ModelsService, private store: Store) {}

  ngOnInit(): void {
    this.store.select(fromModels.getModelsLoaded).subscribe((isLoaded) => {
      this.isModelsListLoaded = isLoaded;
    });
    this.store.select(fromModels.getModelsList).subscribe((modelsList) => {
      this.modelsList = modelsList;
    });
  }

  onDelete(modelId: string) {
    this.modelsService.deleteModel(modelId);
  }
}
