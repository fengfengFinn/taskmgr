import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickTaskComponent implements OnInit {
  desc: string;
  @Output() quickTask = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  @HostListener('keyup.enter')
  sendQuickNewTask(): void {
    if (
      !this.desc ||
      !this.desc.trim() ||
      this.desc.length === 0 ||
      this.desc.length > 20
    ) {
      console.log('return');
      return;
    }
    this.quickTask.emit(this.desc);
    this.desc = '';
  }
}
