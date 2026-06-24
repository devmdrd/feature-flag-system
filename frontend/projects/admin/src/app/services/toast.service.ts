import { Injectable, signal } from "@angular/core";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const TOAST_DURATION_MS = 3000;

@Injectable({ providedIn: "root" })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private counter = 0;

  show(message: string, type: "success" | "error" = "success") {
    const id = ++this.counter;
    this.toasts.update((t) => [...t, { id, message, type }]);
    setTimeout(() => this.remove(id), TOAST_DURATION_MS);
  }

  remove(id: number) {
    this.toasts.update((t) => t.filter((toast) => toast.id !== id));
  }
}
