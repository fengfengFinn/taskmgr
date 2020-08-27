import { itemAnim } from './../../anims/item.anim';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
})
export class TaskItemComponent implements OnInit {
  widerPriority = 'out';
  @Input() item;
  @Input() avatar;
  @Output() taskItemClick = new EventEmitter<void>();
  constructor() {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.widerPriority = 'in';
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.widerPriority = 'out';
  }

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
