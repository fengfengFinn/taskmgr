import { DragDirective } from './drag-drop/drag.directive';
import { NgModule } from '@angular/core';
import { DropDirective } from './drag-drop';
import { DrapDropService } from './drap-drop.service';

@NgModule({
  declarations: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective],
  providers: [DrapDropService],
})
export class DirectiveModule {}
