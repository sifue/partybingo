export class SoundController {
  constructor(src) {
    this.audio = new Audio(src);
  }
  play() {
    this.audio.play();
  }
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
