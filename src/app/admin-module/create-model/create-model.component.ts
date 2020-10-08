import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cman-create-model",
  styleUrls: ["./create-model.component.scss"],
  template: `
    <div class="container">
      <form class="example-form">
        <mat-form-field class="form-full-width">
          <mat-label>Model name</mat-label>
          <input matInput placeholder="Ex. comics" />
        </mat-form-field>
        <mat-form-field class="form-full-width">
          <mat-label>Material icon</mat-label>
          <input matInput placeholder="Ex. sports_esports" />
        </mat-form-field>
        <mat-form-field class="form-full-width">
          <mat-label>Definition</mat-label>
          <textarea matInput> </textarea>
          <mat-hint>Ex. actors: string[]</mat-hint>
        </mat-form-field>
      </form>
    </div>
  `,
})
export class CmanCreateModelComponent implements OnInit {
  constructor() {}

  // verify model name does not already exist
  // parse Definition and make it an Object

  ngOnInit(): void {}
}
