import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  openSidebar(): void {
    this.toggle.emit();
  }

  onChange(checked): void {
    this.toggleDarkTheme.emit(checked);
  }
}
