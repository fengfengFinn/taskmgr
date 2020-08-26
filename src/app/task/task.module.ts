import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TaskHomeComponent } from './task-home';
import { TaskHeaderComponent } from './task-header';
import { TaskItemComponent } from './task-item';
import { TaskListComponent } from './task-list';

@NgModule({
  declarations: [
    TaskHomeComponent,
    TaskHeaderComponent,
    TaskItemComponent,
    TaskListComponent,
  ],
  imports: [SharedModule, TaskRoutingModule],
})
export class TaskModule {}
