import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Model, ModelsState } from "src/app/types";
import * as fromModels from "src/app/ngrx/models/models.selectors";

@Component({
  selector: "cman-home",
  styleUrls: ["./home.component.scss"],
  template: `
    <div class="container">
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
            </mat-card-header>
            <mat-card-actions class="action-buttons">
              <button
                mat-raised-button
                color="primary"
                [routerLink]="['/', 'ct', model.type]"
                routerLinkActive="active"
              >
                Go!
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
})
export class CmanHomeComponent implements OnInit {
  modelsList: Model[];
  isModelsListLoaded = false;
  errorModels: Error;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(fromModels.getModelsState)
      .subscribe((state: ModelsState) => {
        this.isModelsListLoaded = state.isLoaded;
        this.modelsList = state.models;
        this.errorModels = state.error;
      });
  }

  onReloadModels() {}
}
