import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from './../shared';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, LoginRoutingModule],
})
export class LoginModule {}
