import { PruebaVariabilityPage } from './app.po';

describe('prueba-variability App', () => {
  let page: PruebaVariabilityPage;

  beforeEach(() => {
    page = new PruebaVariabilityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
