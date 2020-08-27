import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TaskHomeComponent } from './task-home';
import { TaskHeaderComponent } from './task-header';
import { TaskItemComponent } from './task-item';
import { TaskListComponent } from './task-list';
import { NewTaskComponent } from './new-task';
import { CopyTaskComponent } from './copy-task';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';

@NgModule({
  declarations: [
    TaskHomeComponent,
    TaskHeaderComponent,
    TaskItemComponent,
    TaskListComponent,
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent,
  ],
  imports: [SharedModule, TaskRoutingModule],
  entryComponents: [NewTaskComponent, CopyTaskComponent],
})
export class TaskModule {}
