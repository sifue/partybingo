import Vue from '../asset/vue-2.6.10.esm.browser.min.js';
import { Pingo } from './pingo.js';
import { repository } from './repository.js';

export function parseParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    maxNumber: parseInt(params.get('max'), 10) || 75,
  };
}

export class App {
  constructor({ maxNumber } = {}) {
    console.log('config', {
      maxNumber,
    });

    let { numbers, selectedCount: initialSelectedCount } =
      repository.load() || {};
    if (
      !Array.isArray(numbers) ||
      numbers.length !== maxNumber ||
      typeof initialSelectedCount !== 'number'
    ) {
      numbers = _.shuffle(_.range(1, maxNumber + 1));
      initialSelectedCount = 0;
    }

    new Vue({
      el: '#app',
      data: {
        numbers,
        initialSelectedCount,
      },
      components: {
        Pingo,
      },
      template: `
        <pingo
          :numbers="numbers"
          :initialSelectedCount="initialSelectedCount"
        />
      `,
    });
  }
}
