import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = '';
  @Output() newTask = new EventEmitter<void>();
  @Output() move = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onNewTaskClick(): void {
    this.newTask.emit();
  }

  onMoveClick(): void {
    this.move.emit();
  }
}
