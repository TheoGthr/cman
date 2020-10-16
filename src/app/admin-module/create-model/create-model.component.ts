import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { createModel } from "src/app/ngrx/models.actions";
import { ModelsService } from "src/app/services/models.service";
import { Model } from "src/app/types";

@Component({
  selector: "cman-create-model",
  styleUrls: ["./create-model.component.scss"],
  template: `
    <div class="container">
      <form
        class="create-form"
        [formGroup]="createModelForm"
        (ngSubmit)="onSubmit()"
      >
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
          [disabled]="!createModelForm.valid"
        >
          Create
        </button>
      </form>
    </div>
  `,
})
export class CmanCreateModelComponent {
  createModelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modelsService: ModelsService,
    private router: Router,
    private store: Store
  ) {
    this.createModelForm = this.fb.group({
      type: ["", Validators.required],
      icon: ["", Validators.required],
      definition: ["", Validators.required],
    });
  }

  // verify model name does not already exist

  public onSubmit() {
    const definitionSplitted: string[] = this.createModelForm.value[
      "definition"
    ].split("\n");
    let definition = {};

    for (const line of definitionSplitted) {
      const lineSplitted = line.split(": ");
      definition[lineSplitted[0]] = lineSplitted[1];
    }

    const model: Model = {
      ...this.createModelForm.value,
      definition,
      lastUpdate: { seconds: Date.now() },
    };

    this.modelsService.createModel(model).then((modelRes) => {
      console.log(modelRes);
      //this.store.dispatch(createModel({ model }));
      this.router.navigate(["/admin"]);
    });
  }
}
