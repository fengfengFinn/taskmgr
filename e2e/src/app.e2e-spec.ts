import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { createWriteStream } from 'fs';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    page.navigateTo();
    page.fillInfo().then((result) => {
      const stream = createWriteStream('sc001.jpg');
      stream.write(Buffer.from(result, 'base64'));
      stream.end();
    });
    expect(page.getTitleText()).toEqual('EE Platform');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
