import { NgModule } from "@angular/core";
import { CmanAdminComponent } from "./admin/admin.component";
import { AuthService } from "../services/auth.service";
import { ModelsService } from "../services/models.service";
import { RouterModule, Routes } from "@angular/router";
import { CmanCreateModelComponent } from "./create-model/create-model.component";
import { MaterialModule } from "../material.module";

const routes: Routes = [
  {
    path: "",
    component: CmanAdminComponent,
    children: [{ path: "new", component: CmanCreateModelComponent }],
  },
];

@NgModule({
  declarations: [CmanAdminComponent, CmanCreateModelComponent],
  imports: [
    MaterialModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  providers: [AuthService, ModelsService],
  exports: [RouterModule],
})
export class AdminModule {}
