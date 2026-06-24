import { Component, OnInit, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { ToastService } from "../../services/toast.service";

interface Org {
  id: number;
  name: string;
}

@Component({
  selector: "app-signup",
  imports: [FormsModule, RouterLink],
  templateUrl: "./signup.html",
  styleUrl: "./signup.scss",
})
export class Signup implements OnInit {
  email = "";
  password = "";
  organizationId: number | "" = "";
  orgs = signal<Org[]>([]);

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.api.get<Org[]>("/orgs/public").subscribe({
      next: (data) => this.orgs.set(data),
      error: () => this.toast.show("Failed to load organizations", "error"),
    });
  }

  signup() {
    if (!this.email || !this.password || this.organizationId === "") {
      this.toast.show("All fields are required", "error");
      return;
    }
    if (this.password.length < 8) {
      this.toast.show("Password must be at least 8 characters", "error");
      return;
    }
    if (!/[A-Z]/.test(this.password)) {
      this.toast.show("Password must contain at least one uppercase letter", "error");
      return;
    }
    if (!/[0-9]/.test(this.password)) {
      this.toast.show("Password must contain at least one number", "error");
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.password)) {
      this.toast.show("Password must contain at least one special character", "error");
      return;
    }
    this.api
      .post<{ token: string }>("/auth/signup", {
        email: this.email,
        password: this.password,
        organizationId: this.organizationId,
      })
      .subscribe({
        next: () => {
          this.toast.show("Account created! Please sign in.");
          this.router.navigate(["/login"]);
        },
        error: (e) => this.toast.show(e.error?.error || "Signup failed", "error"),
      });
  }
}
