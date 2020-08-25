import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SidebarComponent } from './sidebar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatToolbarModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule has been existed!');
    }
  }
}
