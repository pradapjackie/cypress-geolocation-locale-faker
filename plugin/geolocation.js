function mockGeolocation(lat, lon) {
  const mockPosition = {
    coords: {
      latitude: lat,
      longitude: lon,
      accuracy: 100,
    },
    timestamp: Date.now()
  };

  cy.window().then((win) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition')
      .callsFake((cb) => cb(mockPosition));
    cy.stub(win.navigator.geolocation, 'watchPosition')
      .callsFake((cb) => cb(mockPosition));
  });
}