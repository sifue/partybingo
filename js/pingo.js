import { SoundController } from './sound-controller.js';
import { repository } from './repository.js';

const audio = new SoundController('asset/nc79078.mp3');

export const Pingo = {
  props: {
    numberListAll: Array,
    initialSelectedCount: Number,
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
      selectedCount: this.initialSelectedCount,
    };
  },
  computed: {
    currentNumber() {
      const i = this.currentNumberIndex;
      return i > 0 ? this.numberListAll[i] : 0;
    },
    selectedNumbers() {
      return this.numberListAll.slice(0, this.selectedCount);
    },
  },
  methods: {
    rouletto() {
      if (this.started) {
        this.currentNumberIndex = this.numberListAll[
          _.random(this.selectedCount, this.numberListAll.length)
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
      this.currentNumberIndex = this.selectedCount;
      this.selectedCount++;
      repository.save({
        numberListAll: this.numberListAll,
        selectedCount: this.selectedCount,
      });
    },
    reset() {
      this.started = false;
      audio.stop();
      this.currentNumberIndex = -1;
      const numberListAll = _.shuffle(this.numberListAll);
      const selectedCount = 0;
      repository.save({
        numberListAll,
        selectedCount,
      });
      this.numberListAll = numberListAll;
      this.selectedCount = selectedCount;
    },
    resetWithConfirm() {
      if (confirm('Do you really want to reset?')) {
        this.reset();
      }
    },
  },
  filters: {
    formatNumber(n) {
      return _.padStart((n || 0).toString(), 2, '0');
    },
  },
};
