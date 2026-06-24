import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { ToastService } from "./services/toast.service";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Toast } from "./components/toast/toast";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  constructor(
    public auth: AuthService,
    private toast: ToastService,
  ) {}

  logout() {
    this.toast.show("Logged out successfully");
    this.auth.logout("oa_token", "/login");
  }
}
