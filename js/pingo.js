import { SoundController } from './sound-controller.js';
import { repository } from './repository.js';

const audio = new SoundController();

export const Pingo = {
  props: {
    numberListAll: Array,
    initialSelectableNumberIndices: Array,
  },
  template: `
  <div class="app">
    <p class="pingo-number">{{ numberListAll[currentNumberIndex] | formatNumber }}</p>
    <div class="buttons">
      <button v-if="!started" @click="start" class="btn btn-lg btn-default control">Start</button>
      <button v-else @click="stop" class="btn btn-lg btn-default control">Stop</button>
      <button @click="resetWithConfirm" class="btn btn-lg btn-default reset">Reset</button>
    </div>
    <h3>Histories</h3>
    <div id="histories" class="row histories">
      <div v-for="n in selectedNumbers">
        <div class="col-md-1"><p class="history-number">{{ n | formatNumber }}</p></div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      currentNumberIndex: -1,
      started: false,
      selectableNumberIndices: [],
    };
  },
  computed: {
    currentNumber() {
      const i = this.currentNumberIndex;
      return i > 0 ? this.numberListAll[i] : 0;
    },
    selectedNumbers() {
      return this.numberListAll
        .filter((_, i) => !this.selectableNumberIndices.includes(i))
        .reverse();
    },
  },
  methods: {
    rouletto() {
      if (this.started) {
        this.currentNumberIndex = this.selectableNumberIndices[
          _.random(this.selectableNumberIndices.length)
        ];
        setTimeout(() => this.rouletto(), 60);
      }
    },
    start() {
      this.started = true;
      audio.play();
      this.rouletto();
    },
    stop() {
      this.started = false;
      audio.stop();
      this.currentNumberIndex = this.selectableNumberIndices.pop();
      repository.save({
        numberListAll: this.numberListAll,
        selectableNumberIndices: this.selectableNumberIndices,
      });
    },
    reset() {
      this.stop();
      this.currentNumberIndex = -1;
      const numberListAll = _.shuffle(this.numberListAll);
      const selectableNumberIndices = _.range(this.numberListAll.length);
      repository.save({
        numberListAll,
        selectableNumberIndices,
      });
      this.numberListAll = numberListAll;
      this.selectableNumberIndices = selectableNumberIndices;
    },
    resetWithConfirm() {
      if (confirm('Do you really want to reset?')) {
        this.reset();
      }
    },
  },
  created() {
    this.selectableNumberIndices = [...this.initialSelectableNumberIndices];
  },
  filters: {
    formatNumber(n) {
      if (!n) {
        return '00';
      }
      if (n > 9) {
        return n.toString(10);
      } else if (n <= 0) {
        return '00';
      } else {
        return `0${n.toString(10)}`;
      }
    },
  },
};
