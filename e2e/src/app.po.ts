import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(
      by.css(
        'app-root mat-sidenav-container mat-sidenav-content .site header app-header mat-toolbar span'
      )
    ).getText() as Promise<string>;
  }

  fillInfo(): Promise<string> {
    element(by.id('mat-input-0')).sendKeys('dev');
    element(by.id('mat-input-1')).sendKeys('dev');
    element(by.buttonText('login')).click();
    return browser.takeScreenshot() as Promise<string>;
  }
}
