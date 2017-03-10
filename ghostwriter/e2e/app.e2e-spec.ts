import { GhostwriterPage } from './app.po';

describe('ghostwriter App', function() {
  let page: GhostwriterPage;

  beforeEach(() => {
    page = new GhostwriterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
