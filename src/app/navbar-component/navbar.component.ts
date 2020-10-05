import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

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
        [opened]="isConnected && (isHandset$ | async) === false"
      >
        <mat-toolbar id="left-toolbar">Cman</mat-toolbar>
        <mat-nav-list *ngIf="isConnected">
          <a mat-list-item href="#"
            ><mat-icon aria-label="Movies icon">movie</mat-icon>Movies</a
          >
          <a mat-list-item href="#"
            ><mat-icon aria-label="Games icon">sports_esports</mat-icon>Games</a
          >
          <a mat-list-item href="#"
            ><mat-icon aria-label="Comics icon">menu_book</mat-icon>Comics</a
          >
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            *ngIf="isConnected && (isHandset$ | async)"
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
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isConnected: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.isConnected = true; // TODO: do it with RxJS
    }
    console.log(this.isConnected);
  }

  ngOnChanges(): void {
    if (localStorage.getItem("username")) {
      this.isConnected = true;
    }
  }
}
