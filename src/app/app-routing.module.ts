import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CmanAdminComponent } from "./admin-module/admin/admin.component";
import { CmanHomeComponent } from "./core-module/home/home.component";
import { CmanLoginComponent } from "./core-module/login/login.component";
import { CmanNotFoundComponent } from "./core-module/not-found/not-found.component";

const routes: Routes = [
  { path: "login", component: CmanLoginComponent },
  { path: "admin", component: CmanAdminComponent }, // canActivate: [AuthGuard] }
  {
    path: "admin",
    loadChildren: () =>
      import(`./admin-module/admin.module`).then((m) => m.AdminModule),
  },
  { path: "home", component: CmanHomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: CmanNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
