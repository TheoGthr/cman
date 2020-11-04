import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { loadModelsPending } from "src/app/ngrx/models/models.actions";
import { ModelsService } from "../../services/models.service";
import { Model, ModelsState } from "../../types";
import { getModelsState } from "src/app/ngrx/models/models.selectors";

@Component({
  selector: "cman-navbar",
  styleUrls: ["./navbar.component.scss"],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <span></span>
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar id="left-toolbar">Cman</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/">
            <mat-icon aria-label="Admin icon">home</mat-icon>
            Home
          </a>
          <a mat-list-item routerLink="/admin">
            <mat-icon aria-label="Admin icon">build_circle</mat-icon>
            Admin
          </a>
        </mat-nav-list>
        <mat-divider></mat-divider>
        <mat-nav-list *ngFor="let modelName of modelsList">
          <a
            mat-list-item
            [routerLink]="['ct', modelName.type]"
            routerLinkActive="active"
          >
            <mat-icon aria-label="Movies icon">{{ modelName.icon }}</mat-icon>
            {{ modelName.label }}
          </a>
        </mat-nav-list>
        <mat-spinner *ngIf="!isModelsListLoaded"></mat-spinner>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            *ngIf="isHandset$ | async"
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
        </mat-toolbar>
        <!-- Add Content Here -->
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class CmanNavbarComponent implements OnInit {
  modelsList: Model[];
  isModelsListLoaded = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    console.log("init!");
    this.store.dispatch(loadModelsPending());
    this.store.select(getModelsState).subscribe((state: ModelsState) => {
      this.isModelsListLoaded = state.isLoaded;
      this.modelsList = state.models;
    });
  }
}
