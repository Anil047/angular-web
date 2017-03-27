import {AngularWebPage} from "./app.po";

describe('angular-web App', () => {
  let page: AngularWebPage;

  beforeEach(() => {
    page = new AngularWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
