import { ProjectService } from './project.service';
import { NgModule } from '@angular/core';
import { QuoteService } from './quote.service';

@NgModule()
export class ServicesModule {
  // tslint:disable-next-line: typedef
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [QuoteService, ProjectService],
    };
  }
}
