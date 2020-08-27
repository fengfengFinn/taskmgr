import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square', [
      state(
        'green',
        style({
          'background-color': 'green',
          height: '100px',
          width: '100px',
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'red',
        style({
          'background-color': 'red',
          height: '100px',
          width: '100px',
          transform: 'translateY(100%)',
        })
      ),
      transition('green=>red', animate('1s')),
      transition(
        'red=>green',
        animate(
          5000,
          keyframes([
            style({ transform: 'translateY(100%)' }),
            style({ transform: 'translateY(98%)' }),
            style({ transform: 'translateY(96%)' }),
            style({ transform: 'translateY(94%)' }),
            style({ transform: 'translateY(90%)' }),
            style({ transform: 'translateY(80%)' }),
            style({ transform: 'translateY(60%)' }),
            style({ transform: 'translateY(30%)' }),
            style({ transform: 'translateY(10%)' }),
            style({ transform: 'translateY(-20%)' }),
            style({ transform: 'translateY(-25%)' }),
            style({ transform: 'translateY(0%)' }),
            style({ transform: 'translateY(10%)' }),
            style({ transform: 'translateY(20%)' }),
            style({ transform: 'translateY(30%)' }),
            style({ transform: 'translateY(-30%)' }),
            style({ transform: 'translateY(-35%)' }),
            style({ transform: 'translateY(-40%)' }),
            style({ transform: 'translateY(-45%)' }),
            style({ transform: 'translateY(-50%)' }),
            style({ transform: 'translateY(-60%)' }),
            style({ transform: 'translateY(-70%)' }),
            style({ transform: 'translateY(-71%)' }),
            style({ transform: 'translateY(-72%)' }),
            style({ transform: 'translateY(-73%)' }),
            style({ transform: 'translateY(-80%)' }),
            style({ transform: 'translateY(-85%)' }),
            style({ transform: 'translateY(-90%)' }),
            style({ transform: 'translateY(-95%)' }),
          ])
        )
      ),
    ]),
  ],
})
export class AppComponent {
  squareState: string;

  title = 'taskmgr';
  // tslint:disable-next-line: variable-name
  private _dark = false;

  get dark(): boolean {
    return this._dark;
  }
  constructor(private oc: OverlayContainer) {}

  switchDarkTheme(dark: boolean): void {
    this._dark = dark;
    if (dark) {
      this.oc.getContainerElement().classList.add('myapp-dark-theme');
    } else {
      this.oc.getContainerElement().classList.remove('myapp-dark-theme');
    }
  }

  onClick(): void {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}
