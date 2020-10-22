import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material.module";
import { AuthService } from "../services/auth.service";
import { ModelsService } from "../services/models.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [],
  providers: [AuthService, ModelsService],
})
export class ContentModule {}
