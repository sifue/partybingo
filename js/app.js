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
    this.maxNumber = maxNumber;
    let numberListAll, initialSelectableNumberIndices;
    const data = repository.load() || {};
    if (
      data.numberListAll &&
      data.numberListAll.length === this.maxNumber &&
      data.selectableNumberIndices
    ) {
      numberListAll = data.numberListAll;
      initialSelectableNumberIndices = data.selectableNumberIndices;
    } else {
      numberListAll = _.shuffle(_.range(1, this.maxNumber + 1));
      initialSelectableNumberIndices = _.range(this.maxNumber);
    }

    new Vue({
      el: '#app',
      data: {
        numberListAll,
        initialSelectableNumberIndices,
      },
      components: {
        Pingo,
      },
      template: `
        <pingo
          :numberListAll="numberListAll"
          :initialSelectableNumberIndices="initialSelectableNumberIndices"
        />
      `,
    });
  }
}
