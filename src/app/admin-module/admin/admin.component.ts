import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cman-admin",
  styleUrls: ["./admin.component.scss"],
  template: `
    <div class="container">
      <button mat-raised-button color="primary">New model</button>
    </div>
  `,
})
export class CmanAdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
