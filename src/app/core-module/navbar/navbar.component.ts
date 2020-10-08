import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { getModels } from "src/app/ngrx/models.actions";
import { ModelsService } from "../../services/models.service";
import { Model } from "../../types";

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
        <mat-nav-list *ngIf="router.url === '/admin'"
          ><a mat-list-item routerLink="admin"
            ><mat-icon aria-label="Admin icon">build_circle</mat-icon>Admin</a
          ></mat-nav-list
        >
        <mat-nav-list *ngIf="router.url !== '/admin'"
          ><a mat-list-item routerLink="admin"
            ><mat-icon aria-label="Admin icon">build_circle</mat-icon>Admin</a
          ></mat-nav-list
        >
        <mat-divider></mat-divider>
        <mat-nav-list *ngFor="let modelName of modelsNames">
          <a
            mat-list-item
            [routerLink]="[modelName.type]"
            routerLinkActive="active"
            ><mat-icon aria-label="Movies icon">{{ modelName.icon }}</mat-icon
            >{{ modelName.type | titlecase }}</a
          >
        </mat-nav-list>
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
  modelsNames: any[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private modelsService: ModelsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.modelsService.getModelsNames().subscribe((data) => {
      this.modelsNames = data.map((e: any) => {
        return {
          ...e,
        };
      });
      this.store.dispatch(getModels({ modelsList: this.modelsNames }));
    });
  }
}
