import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskmgr';
  // tslint:disable-next-line: variable-name
  private _dark = false;

  get dark(): boolean {
    return this._dark;
  }
  constructor() {}

  switchDarkTheme(dark: boolean): void {
    this._dark = dark;
  }
}
