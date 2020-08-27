import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const cardAnim = trigger('card', [
  state('out', style({ transform: 'scale(1)', 'box-shadow': 'none' })),
  state(
    'hover',
    style({ transform: 'scale(1.1)', 'box-shadow': '5px 5px 20px 10px #ccc' })
  ),
  transition('out =>hover', animate('100ms ease-in')),
  transition('hover =>out', animate('100ms ease-out')),
]);
