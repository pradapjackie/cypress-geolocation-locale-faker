describe('Plugin works as expected', () => {
  it('fakes French locale and Paris location', () => {
    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(win) {
        const fakeLang = 'fr-FR';
        const fakeTimezone = 'Europe/Paris';
        const fakeLatitude = 48.8566;
        const fakeLongitude = 2.3522;

        Object.defineProperty(win.navigator, 'language', { value: fakeLang, configurable: true });
        Object.defineProperty(win.navigator, 'languages', { value: [fakeLang], configurable: true });

        const originalResolvedOptions = win.Intl.DateTimeFormat.prototype.resolvedOptions;
        cy.stub(win.Intl.DateTimeFormat.prototype, 'resolvedOptions')
          .callsFake(() => {
            const options = originalResolvedOptions.call(new Intl.DateTimeFormat());
            return { ...options, timeZone: fakeTimezone };
          });

        const mockPosition = {
          coords: {
            latitude: fakeLatitude,
            longitude: fakeLongitude,
            accuracy: 100,
          },
          timestamp: Date.now()
        };

        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .callsFake((cb) => cb(mockPosition));

        cy.stub(win.navigator.geolocation, 'watchPosition')
          .callsFake((cb) => cb(mockPosition));
      }
    });

    cy.get('#language-display').should('contain', 'fr-FR');
    cy.get('#timezone-display').should('contain', 'Europe/Paris');
    cy.get('#location-display').should('contain', '48.8566');
  });
});