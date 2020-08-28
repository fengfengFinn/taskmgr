import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';

export const slideToRight = trigger('routeAnim', [
  state('void', style({ position: 'fixed', width: '100%', height: '80%' })),
  state('*', style({ position: 'fixed', width: '100%', height: '80%' })),
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('0.8s ease-in-out', style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    group([
      animate('.8s ease-in-out', style({ transform: 'translateX(100%)' })),
      animate('.8s ease-out', style({ opacity: 0 })),
    ]),
  ]),
]);
