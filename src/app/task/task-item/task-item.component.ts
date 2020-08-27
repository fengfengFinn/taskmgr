import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskItemClick = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onListItemClick(): void {
    this.taskItemClick.emit();
  }

  onCheckBoxClick(ev: Event): void {
    ev.stopPropagation();
  }
}
