import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { TaskListService } from './task-list.service';
import { AuthService } from './auth.service';

@NgModule()
export class ServicesModule {
  // tslint:disable-next-line: typedef
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        UserService,
        AuthService,
        AuthGuard,
      ],
    };
  }
}
