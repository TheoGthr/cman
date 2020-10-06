import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cman-create-model",
  styleUrls: ["./create-model.component.scss"],
  template: `
    <div class="container">
      <form class="example-form">
        <mat-form-field class="example-full-width">
          <mat-label>Favorite food</mat-label>
          <input matInput placeholder="Ex. Pizza" value="Sushi" />
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Leave a comment</mat-label>
          <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
        </mat-form-field>
      </form>
    </div>
  `,
})
export class CmanCreateModelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
