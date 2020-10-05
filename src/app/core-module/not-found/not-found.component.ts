import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-not-found",
  styleUrls: ["./not-found.component.scss"],
  template: ` <div class="container"><h1>404 Not found</h1></div> `,
})
export class CmanNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
