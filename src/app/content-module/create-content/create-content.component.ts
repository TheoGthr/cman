import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Model } from "src/app/types";
import * as fromModels from "../../ngrx/models.selectors";
import * as fromContent from "../../ngrx/content.selectors";
import { ContentService } from "src/app/services/content.service";
import { map } from "rxjs/operators";
import { createContent, getContentList } from "src/app/ngrx/content.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/core-module/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "content-list",
  styleUrls: ["./create-content.component.scss"],
  template: `
    <div class="container">
      <form
        class="create-form"
        [formGroup]="createContentForm"
        (ngSubmit)="onSubmit()"
      >
        <div *ngFor="let field of fields">
          <mat-form-field class="form-full-width" appearance="fill">
            <mat-label>{{ field | titlecase }}</mat-label>
            <input matInput [formControlName]="field" placeholder="" />
          </mat-form-field>
        </div>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          id="submit-model"
          [disabled]="!createContentForm.valid"
        >
          Create
        </button>
      </form>
    </div>
  `,
})
export class CmanCreateContentComponent implements OnInit {
  modelType: string;
  model: Model;
  contentList;
  fields: string[];
  displayedColumns: string[];

  createContentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private contentService: ContentService,
    private router: Router,
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
          this.fields = Object.keys(model.definition);
          const group = {};
          this.fields.forEach((field) => {
            group[field] = ["", Validators.required];
          });
          console.log(group);
          this.createContentForm = this.fb.group(group);
        });
    });
  }

  public onSubmit() {
    const content = {
      ...this.createContentForm.value,
      lastUpdate: this.contentService.updateTimestamp(),
    };

    this.contentService.createContent(content).then((modelRes) => {
      this.store.dispatch(createContent());
      this.router.navigate(["/admin"]);
    });
  }
}
