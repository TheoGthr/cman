import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CmanHomeComponent } from "./home/home.component";
import { CmanNavbarComponent } from "./navbar/navbar.component";
import { MaterialModule } from "../material.module";
import { LayoutModule } from "@angular/cdk/layout";
import { CmanLoginComponent } from "./login/login.component";
import { CmanNotFoundComponent } from "./not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ModelsService } from "../services/models.service";
import { RouterModule } from "@angular/router";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    CmanHomeComponent,
    CmanNavbarComponent,
    CmanLoginComponent,
    CmanNotFoundComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [CmanNavbarComponent, ConfirmDialogComponent],
  providers: [AuthService, ModelsService],
})
export class CoreModule {}
