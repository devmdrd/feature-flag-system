import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.html",
  styleUrl: "./header.scss",
})
export class Header {
  @Input() title = "";
}
