import { QuoteEffects } from './quote.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

export const effects = {
  quote: QuoteEffects,
};

@NgModule({
  imports: [EffectsModule.forRoot([effects.quote])],
})
export class AppEffectsModule {}
