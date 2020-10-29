import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material.module";
import { AuthService } from "../services/auth.service";
import { ModelsService } from "../services/models.service";
import { CmanContentListComponent } from "./content-list/content-list.component";
import { CmanCreateContentComponent } from "./create-content/create-content.component";
import { CmanUpdateContentComponent } from "./update-content/update-content.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: ":model",
    component: CmanContentListComponent,
  },
  {
    path: ":model/new",
    component: CmanCreateContentComponent,
  },
  {
    path: ":model/update",
    component: CmanUpdateContentComponent,
  },
];

@NgModule({
  declarations: [
    CmanContentListComponent,
    CmanCreateContentComponent,
    CmanUpdateContentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [AuthService, ModelsService],
})
export class ContentModule {}
