import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list';
import { ProjectItemComponent } from './project-item';
import { NewProjectComponent } from './new-project';
import { InviteComponent } from './invite';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent,
  ],
  imports: [SharedModule, ProjectRoutingModule],
  entryComponents: [NewProjectComponent, InviteComponent],
})
export class ProjectModule {}
