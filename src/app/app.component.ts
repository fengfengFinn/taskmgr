import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  trigger,
  state,
  style,
  transition,
  animate,
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
          transform: 'translateX(0)',
        })
      ),
      state(
        'red',
        style({
          'background-color': 'red',
          height: '200px',
          width: '200px',
          transform: 'translateX(100%)',
        })
      ),
      transition('green=>red', animate('.2s 1s')),
      transition('red=>green', animate(1000)),
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
