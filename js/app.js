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

    let { numberListAll, selectedCount: initialSelectedCount } =
      repository.load() || {};
    if (
      !numberListAll ||
      numberListAll.length !== maxNumber ||
      typeof initialSelectedCount !== 'number'
    ) {
      numberListAll = _.shuffle(_.range(1, maxNumber + 1));
      initialSelectedCount = 0;
    }

    new Vue({
      el: '#app',
      data: {
        numberListAll,
        initialSelectedCount,
      },
      components: {
        Pingo,
      },
      template: `
        <pingo
          :numberListAll="numberListAll"
          :initialSelectedCount="initialSelectedCount"
        />
      `,
    });
  }
}
