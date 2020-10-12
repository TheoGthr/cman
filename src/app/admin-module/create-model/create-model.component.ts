import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModelsService } from "src/app/services/models.service";
import { Model } from "src/app/types";

@Component({
  selector: "cman-create-model",
  styleUrls: ["./create-model.component.scss"],
  template: `
    <div class="container">
      <form class="create-form" [formGroup]="createModelForm">
        <mat-form-field
          class="form-full-width"
          appearance="fill"
          formArrayName="name"
        >
          <mat-label>Model name</mat-label>
          <input matInput placeholder="Ex. comics" />
        </mat-form-field>
        <mat-form-field
          class="form-full-width"
          appearance="fill"
          formArrayName="icon"
        >
          <mat-label>Material icon</mat-label>
          <input matInput placeholder="Ex. sports_esports" />
        </mat-form-field>
        <mat-form-field
          class="form-full-width"
          appearance="fill"
          formArrayName="definition"
        >
          <mat-label>Definition</mat-label>
          <textarea matInput> </textarea>
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
    private router: Router
  ) {
    this.createModelForm = this.fb.group({
      name: ["", Validators.required],
      icon: ["", Validators.required],
      definition: ["", Validators.required],
    });
  }

  // verify model name does not already exist
  // parse Definition and make it an Object

  public onSubmit() {
    this.modelsService
      .createModel(this.createModelForm.value as Model)
      .then(() => {
        this.router.navigate(["/admin"]);
      });
  }
}
