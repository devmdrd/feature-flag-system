import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { ToastService } from "../../services/toast.service";

interface Flag {
  id: number;
  key: string;
  enabled: boolean;
  createdAt: string;
}

@Component({
  selector: "app-dashboard",
  imports: [FormsModule, DatePipe],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.scss",
})
export class Dashboard implements OnInit {
  flags = signal<Flag[]>([]);
  newKey = "";
  loading = signal(false);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.loadFlags();
  }

  get token() {
    return this.auth.getToken("oa_token");
  }

  loadFlags() {
    this.loading.set(true);
    this.api.get<Flag[]>("/flags", this.token).subscribe({
      next: (data) => {
        this.flags.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show("Failed to load flags", "error");
        this.loading.set(false);
      },
    });
  }

  createFlag() {
    const key = this.newKey.trim();
    if (!key) return;
    this.api
      .post<Flag>("/flags", { key, enabled: true }, this.token)
      .subscribe({
        next: (flag) => {
          this.toast.show(`Flag "${flag.key}" created!`);
          this.newKey = "";
          this.loadFlags();
        },
        error: (e) =>
          this.toast.show(e.error?.error || "Failed to create", "error"),
      });
  }

  toggleFlag(flag: Flag) {
    this.api
      .patch(`/flags/${flag.id}`, { enabled: !flag.enabled }, this.token)
      .subscribe({
        next: () => {
          this.toast.show(
            `Flag "${flag.key}" ${!flag.enabled ? "enabled" : "disabled"}!`,
          );
          this.loadFlags();
        },
        error: () => this.toast.show("Failed to update flag", "error"),
      });
  }

  deleteFlag(flag: Flag) {
    if (!confirm(`Delete flag "${flag.key}"?`)) return;
    this.api.delete(`/flags/${flag.id}`, this.token).subscribe({
      next: () => {
        this.toast.show(`Flag "${flag.key}" deleted!`);
        this.loadFlags();
      },
      error: () => this.toast.show("Failed to delete flag", "error"),
    });
  }
}
