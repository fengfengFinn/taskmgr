import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DragData, DrapDropService } from '../drap-drop.service';
import {} from 'rxjs';
@Directive({
  selector: '[appDroppable]',
})
export class DropDirective {
  @Input() dragEnterClass: string;
  @Input() dropTags: string[] = [];
  @Output() dropped: EventEmitter<DragData> = new EventEmitter();
  private drag$;

  constructor(
    private el: ElementRef,
    private rd2: Renderer2,
    private drapdropService: DrapDropService
  ) {
    this.drag$ = this.drapdropService.getDragData();
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event): void {
    if (this.el.nativeElement === ev.target) {
      this.rd2.addClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener('drageover', ['$event'])
  onDragOver(ev: Event): void {
    if (this.el.nativeElement === ev.target) {
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event): void {
    if (this.el.nativeElement === ev.target) {
      this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event): void {
    if (this.el.nativeElement === ev.target) {
      this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }
}
