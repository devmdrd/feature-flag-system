import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  email = "";
  password = "";

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {}

  login() {
    if (!this.email.trim() || !this.password) {
      this.toast.show("Email and password are required", "error");
      return;
    }
    this.api
      .post<{ token: string }>("/auth/super-login", {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: ({ token }) => {
          this.auth.setToken("sa_token", token);
          this.toast.show("Welcome back!");
          this.router.navigate(["/dashboard"]);
        },
        error: (e) => this.toast.show(e.error?.error || "Login failed", "error"),
      });
  }
}
