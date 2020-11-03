import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Model } from "src/app/types";
import * as fromModels from "src/app/ngrx/models/models.selectors";
import { ContentService } from "src/app/services/content.service";
import { createContent } from "src/app/ngrx/content/content.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Utils } from "src/app/utils";

@Component({
  selector: "create-content",
  styleUrls: ["./create-content.component.scss"],
  template: `
    <div class="form-container">
      <div>
        <h1>New {{ model.type }}</h1>
      </div>
      <form
        class="create-form"
        [formGroup]="createContentForm"
        (ngSubmit)="onSubmit()"
      >
        <div *ngFor="let field of fields">
          <!-- String -->
          <mat-form-field
            *ngIf="model.definition[field] === 'string'"
            class="form-full-width"
            appearance="fill"
          >
            <mat-label>{{ getSlicedField(field) | titlecase }}</mat-label>
            <input
              matInput
              [formControlName]="getSlicedField(field)"
              placeholder=""
            />
          </mat-form-field>

          <!-- Number -->
          <mat-form-field
            *ngIf="model.definition[field] === 'number'"
            class="form-full-width"
            appearance="fill"
          >
            <mat-label>{{ getSlicedField(field) | titlecase }}</mat-label>
            <input
              matInput
              [formControlName]="getSlicedField(field)"
              placeholder=""
              type="number"
            />
          </mat-form-field>

          <!-- String[] -->
          <mat-form-field
            *ngIf="model.definition[field] === 'string[]'"
            class="form-full-width"
            appearance="fill"
          >
            <mat-label>{{ getSlicedField(field) | titlecase }}</mat-label>
            <textarea
              matInput
              [formControlName]="getSlicedField(field)"
              placeholder=""
            ></textarea>
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
          this.fields = Utils.getDefinitionArray(model.definition);
          const group = {};
          this.fields.forEach((field) => {
            group[this.getSlicedField(field)] = ["", Validators.required];
          });
          group["type"] = [this.modelType, Validators.required];

          this.createContentForm = this.fb.group(group);
        });
    });
  }

  onSubmit() {
    const content = {
      ...this.createContentForm.value,
      lastUpdate: this.contentService.updateTimestamp(),
    };

    this.contentService.createContent(content).finally(() => {
      this.router.navigate(["/ct/" + this.modelType]);
    });
  }

  getSlicedField(field: string): string {
    return Utils.getSlicedDefField(field);
  }
}
