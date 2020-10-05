import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import * as firebase from "firebase";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "cman-login",
  styleUrls: ["./login.component.scss"],
  template: `
    <div class="container">
      <form
        class="login-form"
        [formGroup]="loginForm"
        (ngSubmit)="onFormSubmit(loginForm.value)"
      >
        <h2>Please login using your username</h2>
        <mat-form-field class="login-full-width">
          <mat-label>Username</mat-label>
          <input
            matInput
            placeholder="Enter your username"
            formControlName="username"
            [errorStateMatcher]="matcher"
          />
          <mat-error>
            <span
              *ngIf="
                !loginForm.get('username').valid &&
                loginForm.get('username').touched
              "
              >Please enter your username</span
            >
          </mat-error>
        </mat-form-field>
        <div class="button-row">
          <button
            type="submit"
            [disabled]="!loginForm.valid"
            mat-fab
            color="primary"
          >
            <mat-icon>login</mat-icon>
          </button>
        </div>
      </form>
    </div>
  `,
})
export class CmanLoginComponent {
  loginForm: FormGroup;
  username = "";
  ref = firebase.database().ref("users/");
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (localStorage.getItem("username")) {
      // this.router.navigate(["/home"]);
    }
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
    });
  }

  onFormSubmit(form: any) {
    const login = form;
    this.ref
      .orderByChild("username")
      .equalTo(login.username)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem("username", login.username);
          this.router.navigate(["/home"]);
        } else {
          const newUser = firebase.database().ref("users/").push();
          newUser.set(login);
          localStorage.setItem("username", login.username);
          this.router.navigate(["/home"]);
        }
      });
  }
}
