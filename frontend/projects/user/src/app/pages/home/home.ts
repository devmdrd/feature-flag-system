import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";

interface Org {
  id: number;
  name: string;
}
interface Flag {
  id: number;
  key: string;
  enabled: boolean;
}
interface Result {
  key: string;
  enabled: boolean;
}

@Component({
  selector: "app-home",
  imports: [FormsModule],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
})
export class Home implements OnInit {
  orgs = signal<Org[]>([]);
  flags = signal<Flag[]>([]);
  selectedOrgId = signal("");
  selectedKey = signal("");
  result = signal<Result | null>(null);
  error = signal("");

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<Org[]>("/orgs/public").subscribe({
      next: (data) => this.orgs.set(data),
      error: () => this.error.set("Failed to load organizations"),
    });
  }

  onOrgChange(orgId: string) {
    this.selectedOrgId.set(orgId);
    this.flags.set([]);
    this.selectedKey.set("");
    this.result.set(null);
    this.error.set("");
    if (!orgId) return;
    this.api.get<Flag[]>(`/flags/public?orgId=${orgId}`).subscribe({
      next: (data) => this.flags.set(data),
      error: () => this.error.set("Failed to load flags"),
    });
  }

  selectFlag(key: string) {
    this.selectedKey.set(key);
    this.result.set(null);
    this.error.set("");
  }

  checkFlag() {
    if (!this.selectedKey() || !this.selectedOrgId()) return;
    this.error.set("");
    this.api
      .get<Result>(
        `/flags/check?orgId=${this.selectedOrgId()}&key=${encodeURIComponent(this.selectedKey())}`,
      )
      .subscribe({
        next: (data) => this.result.set(data),
        error: (e) => this.error.set(e.error?.error || "Flag not found"),
      });
  }
}
