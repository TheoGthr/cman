import { Component } from "@angular/core";
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAOrKmQ41QZQGM-z_pZj80LV8gbqLhgxbo",
  databaseURL: "https://c-man-ng.firebaseio.com",
};

@Component({
  selector: "app-root",
  template: ` <cman-navbar></cman-navbar> `,
})
export class AppComponent {
  constructor() {
    firebase.initializeApp(config);
  }
}
