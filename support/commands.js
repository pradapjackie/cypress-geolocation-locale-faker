Cypress.Commands.add('setLocaleAndTimezone', (locale = 'fr-FR', timezone = 'Europe/Paris') => {
  cy.visit('/', {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'language', { value: locale });
      Object.defineProperty(win.navigator, 'languages', { value: [locale] });
      Intl.DateTimeFormat = class extends Intl.DateTimeFormat {
        constructor(...args) {
          super(locale, { timeZone: timezone, ...args[1] });
        }
      };
    }
  });
});

Cypress.Commands.add('mockGeolocation', (lat = 48.8566, lon = 2.3522) => {
  cy.window().then((win) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition')
      .callsFake((cb) => cb({ coords: { latitude: lat, longitude: lon, accuracy: 100 } }));
  });
});