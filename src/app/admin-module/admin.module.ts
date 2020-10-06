import { NgModule } from "@angular/core";
import { CmanAdminComponent } from "./admin/admin.component";
import { CmanAdminHomeComponent } from "./admin-home/admin-home.component";
import { AuthService } from "../services/auth.service";
import { ModelsService } from "../services/models.service";
import { RouterModule, Routes } from "@angular/router";
import { CmanCreateModelComponent } from "./create-model/create-model.component";
import { MaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/admin/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: CmanAdminHomeComponent,
  },
  { path: "new", component: CmanCreateModelComponent },
];

@NgModule({
  declarations: [
    CmanAdminComponent,
    CmanAdminHomeComponent,
    CmanCreateModelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService, ModelsService],
  exports: [RouterModule],
})
export class AdminModule {}
