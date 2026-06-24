import { Routes } from "@angular/router";
import { authGuard, guestGuard } from "./services/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login").then((m) => m.Login),
    canActivate: [guestGuard("oa_token")],
  },
  {
    path: "signup",
    loadComponent: () => import("./pages/signup/signup").then((m) => m.Signup),
    canActivate: [guestGuard("oa_token")],
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./pages/dashboard/dashboard").then((m) => m.Dashboard),
    canActivate: [authGuard("oa_token")],
  },
  { path: "**", redirectTo: "login" },
];
