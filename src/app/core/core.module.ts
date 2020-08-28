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
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    SharedModule,
    HttpClientModule,
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
  providers: [{ provide: 'BASE_CONFIG', useValue: 'http://localhost:3000' }],
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
