import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Model } from "src/app/types";
import * as fromModels from "../../ngrx/models.selectors";

@Component({
  selector: "cman-home",
  styleUrls: ["./home.component.scss"],
  template: `
    <div class="container">
      <div class="models">
        <mat-spinner *ngIf="!isModelsListLoaded"></mat-spinner>
        <div class="cards" *ngFor="let model of modelsList">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ model.label }}</mat-card-title>
              <mat-card-subtitle>Number of elements : </mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions class="action-buttons">
              <button
                mat-raised-button
                color="primary"
                [routerLink]="['/', model.type]"
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
  isModelsListLoaded: boolean = false;

  constructor(private store: Store) {}

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
}
