import { AppEffectsModule } from './../effects/index';
import { AppStoreModule } from './../reducers/index';
import { ServicesModule } from './../services/services.module';
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
import { AppRoutingModule } from '../app-routing.module';
import 'hammerjs';
import '../utils/debug.util';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppEffectsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'BASE_CONFIG', useValue: { uri: 'http://localhost:3000' } },
  ],
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
