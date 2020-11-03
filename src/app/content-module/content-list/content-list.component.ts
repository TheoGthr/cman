import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";
import { Model } from "src/app/types";
import * as fromModels from "src/app/ngrx/models/models.selectors";
import * as fromContent from "src/app/ngrx/content/content.selectors";
import { ContentService } from "src/app/services/content.service";
import { map } from "rxjs/operators";
import { getContentList } from "src/app/ngrx/content/content.actions";
import { Utils } from "src/app/utils";

@Component({
  selector: "content-list",
  styleUrls: ["./content-list.component.scss"],
  template: `
    <div class="list-container">
      <div class="title">
        <h1>{{ model.label }}</h1>
        <button mat-raised-button color="primary" routerLink="new">New</button>
      </div>
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input
          matInput
          (keyup)="applyFilter($event)"
          placeholder="Ex. ium"
          #input
        />
      </mat-form-field>
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

          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="4">
              No data matching the filter "{{ input.value }}"
            </td>
          </tr>
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

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.params.subscribe((params: Params) => {
      this.modelType = params.model;
      this.store
        .select(fromModels.getModelByType, this.modelType)
        .subscribe((model: Model) => {
          this.model = model;
          this.displayedColumns = Utils.getDefinitionArray(
            model.definition
          ).map((col) => col.slice(2));
        });
    });
  }

  ngOnInit(): void {
    this.contentList = this.contentService.getContentByType(this.modelType);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contentList.filter = filterValue.trim().toLowerCase();
  }
}
