# Cypress Geolocation & Locale Faker

##  Features

- 🌍 Mock geolocation (latitude & longitude)
- 🕓 Fake timezone (via `Intl.DateTimeFormat`)
- 🌐 Override browser locale (`navigator.language`)
- 🔁 All in one command: `cy.visitWithGeoLocale()`

##  Usage

The `cy.visitWithGeoLocale()` command allows you to simulate a browser environment with customized geolocation, timezone, and locale settings—all in one simple command.

###  Syntax

```js
cy.visitWithGeoLocale(url, options?)
```

- `url`: *(string)* – The URL to visit.
- `options`: *(object)* – Optional overrides:
  - `latitude`: *(number)* – Mock latitude value (default: 37.7749)
  - `longitude`: *(number)* – Mock longitude value (default: -122.4194)
  - `timezone`: *(string)* – IANA timezone (default: 'America/Los_Angeles')
  - `locale`: *(string)* – Browser locale (default: 'en-US')

###  Example

```js
cy.visitWithGeoLocale('https://example.com', {
  latitude: 48.8566,
  longitude: 2.3522,
  timezone: 'Europe/Paris',
  locale: 'fr-FR'
});
```

This will:
- Set geolocation to Paris (France)
- Set timezone to `Europe/Paris`
- Simulate browser language as French (`fr-FR`)

### 🕓 Set Fake Timezone Only

You can also override just the timezone independently using `cy.setTimezone()`.

#### 🔧 Syntax

```js
cy.setTimezone(timezone)
```

- `timezone`: *(string)* – A valid IANA timezone string, such as `'Asia/Tokyo'` or `'America/New_York'`.

#### 📘 Example

```js
cy.setTimezone('Asia/Tokyo');
cy.visit('https://example.com');
```

This will fake the browser's timezone as Japan (`Asia/Tokyo`) before loading the page.

###  Tip

Use this command at the beginning of your test cases to simulate international user behavior.

##  Installation

```bash
npm install cypress-geolocation-locale-faker --save-dev
```
