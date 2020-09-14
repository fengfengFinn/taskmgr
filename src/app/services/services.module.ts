import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { QuoteService } from './quote.service';

export { QuoteService };

@NgModule({
  providers: [QuoteService],
})
export class ServicesModule {
  // tslint:disable-next-line: typedef
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [QuoteService],
    };
  }
}
