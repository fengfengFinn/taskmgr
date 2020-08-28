import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared';
import { CoreModule } from './core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
