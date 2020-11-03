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
  selector: "update-content",
  styleUrls: ["./update-content.component.scss"],
  template: `
    <div class="container">
      <form
        class="update-form"
        [formGroup]="updateContentForm"
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
          [disabled]="!updateContentForm.valid"
        >
          Create
        </button>
      </form>
    </div>
  `,
})
export class CmanUpdateContentComponent implements OnInit {
  id: string;
  modelType: string;
  model: Model;
  contentList;
  fields: string[];
  displayedColumns: string[];

  updateContentForm: FormGroup;

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

      this.route.queryParams.subscribe((qparams) => {
        this.id = qparams.id;
        this.store
          .select(fromModels.getModelByType, this.modelType)
          .subscribe((model: Model) => {
            this.model = model;
            this.fields = Utils.getDefinitionArray(model.definition);
            const group = {};
            this.fields.forEach((field) => {
              group[field] = ["", Validators.required];
            });

            this.updateContentForm = this.fb.group(group);
          });
      });
    });
  }

  public onSubmit() {
    const content = {
      ...this.updateContentForm.value,
      lastUpdate: this.contentService.updateTimestamp(),
    };

    this.contentService.createContent(content).finally(() => {
      this.router.navigate(["/ct/" + this.modelType]);
    });
  }
}
