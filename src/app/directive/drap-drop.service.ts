import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DragData {
  tag: string;
  data: any;
}

@Injectable()
export class DrapDropService {
  // tslint:disable-next-line: variable-name
  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData): void {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData(): void {
    this._dragData.next(null);
  }
}
