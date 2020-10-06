import { Component, OnInit } from "@angular/core";
import { ModelsService } from "src/app/services/models.service";
import { Model } from "src/app/types";

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
        <mat-spinner *ngIf="!modelsNames"></mat-spinner>
        <div class="cards" *ngFor="let model of modelsNames">
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>{{ model.type }}</mat-card-title>
              <mat-card-subtitle>Last update: XXXX</mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions>
              <button mat-raised-button color="warn">Delete</button>
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
  modelsNames: any[];
  constructor(private modelsService: ModelsService) {}

  ngOnInit(): void {
    this.modelsService.getModelsNames().subscribe((data) => {
      this.modelsNames = data.map((e: Model) => {
        return {
          ...e,
        };
      });
    });
  }
}
