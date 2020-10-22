import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { RouterModule } from "@angular/router";

import { CmanHomeComponent } from "./home/home.component";
import { CmanNavbarComponent } from "./navbar/navbar.component";
import { MaterialModule } from "../material.module";
import { CmanLoginComponent } from "./login/login.component";
import { CmanNotFoundComponent } from "./not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ModelsService } from "../services/models.service";
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
    CommonModule,
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
