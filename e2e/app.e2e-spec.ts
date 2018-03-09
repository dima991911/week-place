import { PlaceWeekPage } from './app.po';

describe('place-week App', () => {
  let page: PlaceWeekPage;

  beforeEach(() => {
    page = new PlaceWeekPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
