import { LoginModule } from './login/login.module';
import { SharedModule } from './shared';
import { CoreModule } from './core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    LoginModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
