globalThis.process = globalThis.process || { env: {} };
globalThis.process.env = globalThis.process.env || {};

require('./reanimated-web-polyfill');
const registerRootComponent = require('expo/build/launch/registerRootComponent').default;
const App = require('./App').default;

registerRootComponent(App);
