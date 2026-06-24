import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private router: Router) {}

  getToken(key: string): string | null {
    return localStorage.getItem(key);
  }

  setToken(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  removeToken(key: string): void {
    localStorage.removeItem(key);
  }

  isValid(tokenKey: string): boolean {
    return !!this.getToken(tokenKey);
  }

  logout(tokenKey: string, redirectPath: string): void {
    this.removeToken(tokenKey);
    this.router.navigate([redirectPath]);
  }
}
