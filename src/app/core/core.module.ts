import { SharedModule } from './../shared';
import { loadSvgResources } from './../utils/svg.utils';
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SidebarComponent } from './sidebar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [SharedModule, HttpClientModule, BrowserAnimationsModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegister: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    if (parent) {
      throw new Error('CoreModule has been existed!');
    }
    loadSvgResources(iconRegister, sanitizer);
  }
}