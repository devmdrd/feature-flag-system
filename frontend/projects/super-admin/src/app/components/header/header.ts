import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.html",
  styleUrl: "./header.scss",
})
export class Header {
  @Input() title = "";
  @Input() showLogout = false;
  @Output() logout = new EventEmitter<void>();
}
