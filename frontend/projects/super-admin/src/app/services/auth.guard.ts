import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard = (tokenKey: string): CanActivateFn => () => {
  const isValid = inject(AuthService).isValid(tokenKey);
  return isValid || inject(Router).createUrlTree(["/login"]);
};

export const guestGuard = (tokenKey: string): CanActivateFn => () => {
  const isValid = inject(AuthService).isValid(tokenKey);
  return isValid ? inject(Router).createUrlTree(["/dashboard"]) : true;
};
