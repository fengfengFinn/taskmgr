import { Component, Inject, ReflectiveInjector } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

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
  constructor(private oc: OverlayContainer, @Inject('BASE_CONFIG') config) {}

  switchDarkTheme(dark: boolean): void {
    this._dark = dark;
    if (dark) {
      this.oc.getContainerElement().classList.add('myapp-dark-theme');
    } else {
      this.oc.getContainerElement().classList.remove('myapp-dark-theme');
    }
  }
}
