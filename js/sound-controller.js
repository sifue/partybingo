export class SoundController {
  constructor() {
    this.audio = new Audio('asset/nc79078.mp3');
  }
  play() {
    this.audio.play();
  }
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
