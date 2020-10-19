import { ProjectEffects } from './project.effects';
import { AuthEffects } from './auth.effects';
import { QuoteEffects } from './quote.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

export const effects = {
  quote: QuoteEffects,
  auth: AuthEffects,
  project: ProjectEffects,
};

@NgModule({
  imports: [
    EffectsModule.forRoot([effects.quote, effects.auth, effects.project]),
  ],
})
export class AppEffectsModule {}
