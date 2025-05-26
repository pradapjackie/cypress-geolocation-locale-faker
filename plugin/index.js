module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--lang=en-GB');
      launchOptions.args.push('--timezone=Europe/London');
      launchOptions.args.push('--use-fake-ui-for-media-stream');
    }
    return launchOptions;
  });
};