import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  today = 'day1';

  @Output() navClick = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
    this.today = `day${getDate(new Date())}`;
  }

  onNavClick(): void {
    this.navClick.emit();
  }
}
