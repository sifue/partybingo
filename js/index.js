import { parseParams, App } from './app.js';

window.addEventListener('DOMContentLoaded', () => {
  new App(parseParams());
});
