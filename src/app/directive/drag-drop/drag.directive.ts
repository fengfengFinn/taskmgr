import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core';
import { DrapDropService } from '../drap-drop.service';

@Directive({
  selector: '[appDraggable]',
})
export class DragDirective {
  // tslint:disable-next-line: variable-name
  private _isDraggble = false;

  @Input('appDraggable')
  public set Draggle(draggable: boolean) {
    this._isDraggble = draggable;
    this.rd2.setAttribute(this.el.nativeElement, 'draggable', `${draggable}`);
  }

  public get Draggle(): boolean {
    return this._isDraggble;
  }

  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  constructor(
    private el: ElementRef,
    private rd2: Renderer2,
    private drapdropService: DrapDropService
  ) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event): void {
    if (this.el.nativeElement === ev.target) {
      this.rd2.addClass(this.el.nativeElement, this.draggedClass);
      this.drapdropService.setDragData({
        tag: this.dragTag,
        data: this.dragData,
      });
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event): void {
    if (this.el.nativeElement === ev.target) {
      this.rd2.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
