Cypress.Commands.add('visitWithGeoLocale', ({
    url,
    locale = 'en-US',
    timezone = 'UTC',
    latitude = 37.7749,
    longitude = -122.4194
  }) => {
    cy.visit(url, {
      onBeforeLoad(win) {
        // Mock locale
        Object.defineProperty(win.navigator, 'language', { value: locale, configurable: true });
        Object.defineProperty(win.navigator, 'languages', { value: [locale], configurable: true });
  
        // Mock timezone
        const originalResolvedOptions = win.Intl.DateTimeFormat.prototype.resolvedOptions;
        cy.stub(win.Intl.DateTimeFormat.prototype, 'resolvedOptions')
          .callsFake(() => {
            const options = originalResolvedOptions.call(new Intl.DateTimeFormat());
            return { ...options, timeZone: timezone };
          });
  
        // Mock geolocation
        const mockPosition = {
          coords: {
            latitude,
            longitude,
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
  });