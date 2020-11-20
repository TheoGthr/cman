import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";
import { Content, ContentState, Model } from "src/app/types";
import * as fromModels from "src/app/ngrx/models/models.selectors";
import * as fromContent from "src/app/ngrx/content/content.selectors";
import { Utils } from "src/app/utils";
import {
  deleteContentPending,
  loadContentPending,
} from "src/app/ngrx/content/content.actions";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/core-module/confirm-dialog/confirm-dialog.component";

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
        <table mat-table [dataSource]="contentList" matSort>
          <ng-container
            *ngFor="let col of displayedColumns"
            [matColumnDef]="col"
          >
            <ng-container *ngIf="col !== 'actions'">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>
                {{ col | titlecase }}
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element[col] }}
              </td>
            </ng-container>
            <ng-container *ngIf="col === 'actions'" justify="end">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let element">
                <button
                  mat-icon-button
                  matTooltip="Modify"
                  [routerLink]="['update', element['id']]"
                >
                  <mat-icon>edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  matTooltip="Delete"
                  (click)="onDelete(element['id'])"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
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
      <mat-card *ngIf="errorContent">
        <mat-card-header>
          <mat-card-title>Error</mat-card-title>
          <mat-card-subtitle>Please reload the page</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
    </div>
  `,
})
export class CmanContentListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  modelType: string;
  model: Model;
  contentList: MatTableDataSource<Content>;
  errorContent: Error;
  displayedColumns: string[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.modelType = params.model;
      this.store
        .select(fromModels.getModelByType, this.modelType)
        .subscribe((model: Model) => {
          this.model = model;
          this.displayedColumns = Utils.getDefinitionArray(
            model.definition
          ).map((col) => col.slice(2));
          this.displayedColumns.push("actions");

          this.store.dispatch(loadContentPending({ modelType: model.type }));
          this.store
            .select(fromContent.getContentState)
            .subscribe((contentState: ContentState) => {
              if (contentState.isLoaded) {
                this.contentList = new MatTableDataSource<Content>(
                  contentState.content
                );
                this.contentList.sort = this.sort;
              }
              this.errorContent = contentState.error;
            });
        });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contentList.filter = filterValue.trim().toLowerCase();
  }

  onDelete(contentId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: "Do you confirm the deletion?",
        confirm: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteContentPending({ contentId }));
      }
    });
  }
}
