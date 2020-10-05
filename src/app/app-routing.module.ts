import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CmanHomeComponent } from "./home-component/home.component";
import { CmanLoginComponent } from "./login/login.component";
import { CmanNotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "login", component: CmanLoginComponent },
  { path: "home", component: CmanHomeComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: CmanNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
