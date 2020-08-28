import { DragDirective } from './drag-drop/drag.directive';
import { NgModule } from '@angular/core';
import { DropDirective } from './drag-drop';
import { DragDropService } from './drag-drop.service';

@NgModule({
  declarations: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective],
  providers: [DragDropService],
})
export class DirectiveModule {}
