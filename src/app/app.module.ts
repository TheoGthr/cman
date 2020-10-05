import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CmanHomeComponent } from "./home-component/home.component";
import { CmanNavbarComponent } from "./navbar-component/navbar.component";
import { MaterialModule } from "./material.module";
import { LayoutModule } from "@angular/cdk/layout";
import { CmanLoginComponent } from "./login/login.component";
import { CmanNotFoundComponent } from "./not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CmanHomeComponent,
    CmanNavbarComponent,
    CmanLoginComponent,
    CmanNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    
    FormsModule, ReactiveFormsModule
  ],
  exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
