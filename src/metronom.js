const Tone = require('tone');

class Metronom {

	constructor() {
		console.log('Metronom constructor');
    this.ones = 0;
    this.bpm = 120;
    Tone.Transport.bpm.value = this.bpm;
	}

  startBeat() {
    // Tone.Transport.bpm.value = 200;
    Tone.Transport.scheduleRepeat(() => this.hit(), "0:1:0")
    Tone.Transport.start();
  }

  hit() {
    console.log('hit');
    this.ones = 1;
    setTimeout(() => {
      this.ones = 0;
    }, 150)
  }
}

module.exports = Metronom;