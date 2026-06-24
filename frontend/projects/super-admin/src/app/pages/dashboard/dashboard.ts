import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { ToastService } from "../../services/toast.service";

interface Org {
  id: number;
  name: string;
  createdAt: string;
}

@Component({
  selector: "app-dashboard",
  imports: [FormsModule, DatePipe],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.scss",
})
export class Dashboard implements OnInit {
  orgs = signal<Org[]>([]);
  newOrgName = "";
  loading = signal(false);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.loadOrgs();
  }

  get token() {
    return this.auth.getToken("sa_token");
  }

  loadOrgs() {
    this.loading.set(true);
    this.api.get<Org[]>("/orgs", this.token).subscribe({
      next: (data) => {
        this.orgs.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show("Failed to load organizations", "error");
        this.loading.set(false);
      },
    });
  }

  createOrg() {
    const name = this.newOrgName.trim();
    if (!name) return;
    this.api.post<Org>("/orgs", { name }, this.token).subscribe({
      next: (org) => {
        this.toast.show(`Organization "${org.name}" created!`);
        this.newOrgName = "";
        this.loadOrgs();
      },
      error: (e) =>
        this.toast.show(e.error?.error || "Failed to create", "error"),
    });
  }
}
