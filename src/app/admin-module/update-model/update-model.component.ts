import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ConfirmDialogComponent } from "src/app/core-module/confirm-dialog/confirm-dialog.component";
import { ModelsService } from "src/app/services/models.service";
import { Model } from "src/app/types";
import { Utils } from "src/app/utils";
import * as fromModels from "src/app/ngrx/models/models.selectors";

@Component({
  selector: "cman-update-model",
  styleUrls: ["./update-model.component.scss"],
  template: `
    <div class="container">
      <form
        class="update-form"
        [formGroup]="updateModelForm"
        (ngSubmit)="onSubmit()"
      >
        <mat-form-field class="form-full-width" appearance="fill">
          <mat-label>Model label</mat-label>
          <input matInput formControlName="label" placeholder="Ex. Comics" />
        </mat-form-field>
        <mat-form-field class="form-full-width" appearance="fill">
          <mat-label>Model type</mat-label>
          <input matInput formControlName="type" placeholder="Ex. comics" />
        </mat-form-field>
        <mat-form-field class="form-full-width" appearance="fill">
          <mat-label>Material icon</mat-label>
          <input
            matInput
            formControlName="icon"
            placeholder="Ex. sports_esports"
          />
        </mat-form-field>
        <mat-form-field class="form-full-width" appearance="fill">
          <mat-label>Definition</mat-label>
          <textarea formControlName="definition" matInput> </textarea>
          <mat-hint>Ex. actors: string[]</mat-hint>
        </mat-form-field>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          id="submit-model"
          [disabled]="!updateModelForm.valid"
        >
          Update
        </button>
      </form>
    </div>
  `,
})
export class CmanUpdateModelComponent implements OnInit {
  updateModelForm: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private modelsService: ModelsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;

      this.store
        .select(fromModels.getModelById, this.id)
        .subscribe((model: Model) => {
          const definitionStr = Utils.getDefinitionString(
            Utils.sortObj(model.definition)
          );

          this.updateModelForm = this.fb.group({
            label: [model.label, Validators.required],
            type: [model.type, Validators.required],
            icon: [model.icon, Validators.required],
            definition: [definitionStr, Validators.required],
          });
        });
    });
  }

  onSubmit() {
    Utils.sortObj({});
    const { isIncorrect, definition } = Utils.getDefinitionObject(
      this.updateModelForm.value["definition"]
    );

    if (isIncorrect) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: "Some fields are not correct",
        },
      });
    } else {
      const model: Model = {
        ...this.updateModelForm.value,
        id: this.id,
        definition,
        lastUpdate: this.modelsService.updateTimestamp(),
      };
      this.modelsService.updateModel(model).then(() => {
        this.router.navigate(["/admin"]);
      });
    }
  }
}
