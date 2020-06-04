const Tone = require('tone');

class Metronom {

	constructor() {
		console.log('Metronom constructor');
    
    this.variables = {
      ones: 0,
      twos: 0,
      fours: 0
    }
    
    this.bpm = 120;
    Tone.Transport.bpm.value = this.bpm;
	}

  startBeat() {
    // Tone.Transport.bpm.value = 200;
    Tone.Transport.scheduleRepeat(() => this.hit('ones'), "0:1:0");
    // Tone.Transport.scheduleRepeat(() => this.hit('twos'), "0:2:0");
    // Tone.Transport.scheduleRepeat(() => this.hit('fours'), "1:0:0");
    Tone.Transport.start();
  }

  stopBeat() {
    Tone.Transport.stop();
  }


  hit (variableName, duration = 150) {
    console.log('hitting ' + variableName)
    this.variables[variableName] = 1;
    setTimeout(() => {
      this.variables[variableName] = 0;
    }, duration)
  }
}

module.exports = Metronom;