import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  @Input() item;

  @Output() invite = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onInviteClick(): void {
    this.invite.emit();
  }
  onEditClick(): void {
    this.edit.emit();
  }
  onDeleteClick(): void {
    this.delete.emit();
  }
}
