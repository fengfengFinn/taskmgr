import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][dragTag][draggedClass][dragData]',
})
export class DragDirective {
  // tslint:disable-next-line:variable-name
  private _isDraggable = false;
  @Input() dragTag: string;
  @Input() draggedClass: string;
  @Input() dragData: any;
  @Input('app-draggable')
  set isDraggable(draggable: boolean) {
    this._isDraggable = draggable;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${draggable}`);
  }

  // tslint:disable-next-line:typedef
  get isDraggable() {
    return this._isDraggable;
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {}

  @HostListener('dragstart', ['$event'])
  // tslint:disable-next-line:typedef
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({ tag: this.dragTag, data: this.dragData });
    }
  }

  @HostListener('dragend', ['$event'])
  // tslint:disable-next-line:typedef
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
