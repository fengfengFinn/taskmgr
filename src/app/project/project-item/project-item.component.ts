import { cardAnim } from './../../anims/card.anim';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim],
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() invite = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() selected = new EventEmitter<void>();

  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.cardState = 'out';
  }

  constructor() {}

  ngOnInit(): void {}

  onInviteClick(ev: Event): void {
    ev.stopPropagation();
    this.invite.emit();
  }
  onEditClick(ev: Event): void {
    ev.stopPropagation();
    this.edit.emit();
  }
  onDeleteClick(ev: Event): void {
    ev.stopPropagation();
    this.delete.emit();
  }

  onClick(): void {
    this.selected.emit();
  }
}
