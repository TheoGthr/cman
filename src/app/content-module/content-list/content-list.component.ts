import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";
import { Model } from "src/app/types";
import * as fromModels from "../../ngrx/models.selectors";

@Component({
  selector: "content-list",
  styleUrls: ["./content-list.component.scss"],
  template: `
    <div class="list-container">
      <div class="title">
        <h1>{{ model.label }}</h1>
        <button mat-raised-button color="primary" routerLink="new">New</button>
      </div>
      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="contentList">
          <ng-container
            *ngFor="let col of displayedColumns"
            [matColumnDef]="col"
          >
            <th mat-header-cell *matHeaderCellDef>{{ col | titlecase }}</th>
            <td mat-cell *matCellDef="let element">
              {{ element[col] }}
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="displayedColumns; sticky: true"
          ></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </div>
  `,
})
export class CmanContentListComponent implements OnInit {
  modelType: string;
  model: Model;
  contentList;
  displayedColumns: string[];

  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.params.subscribe((params: Params) => {
      this.modelType = params.model;
      this.store
        .select(fromModels.getModelByType, this.modelType)
        .subscribe((model: Model) => {
          this.displayedColumns = Object.keys(model.definition);
        });
    });
    this.contentList = [
      {
        title: "12 angry men",
        year: 1983,
        producers: ["?"],
        actors: ["Henry Fonda"],
        size: "2Go",
      },
      {
        title: "Toy Story",
        producers: ["?"],
        year: 2003,
        actors: ["Toys"],
        size: "1.23Go",
      },
      {
        title: "Pinocchio",
        producers: ["?"],
        year: 1962,
        actors: ["Planks"],
        size: "600Mo",
      },
    ];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      //if model exists ?
      this.modelType = params.model;
      this.store
        .select(fromModels.getModelByType, this.modelType)
        .subscribe((model) => {
          this.model = model;
        });
    });
  }
}
