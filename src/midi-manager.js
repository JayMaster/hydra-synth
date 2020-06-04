class MidiManager {

	constructor() {
		this.beatToggle = 72;
		this.scenePads = [43, 44, 45, 46, 47];

		console.log('MidiManager constructor');
		this._init();
	}

	_init() {
		// register WebMIDI
    	navigator.requestMIDIAccess()
        .then(this.onMIDISuccess, this.onMIDIFailure);

        this.registerMIDI();
	}

	registerMIDI() {
		let beatTogglerMIDIChannel = 72; // MIDI channel to turn on / off the "beater" interval as a toggle
		let toggleButtons = []; // all buttons that should be toggle buttons
		let j = 0;
		for (var i = 51; i < 73; i++) {
			toggleButtons[j] = i;
			j++;
		}
	}

	onMIDISuccess (midiAccess) {
        console.log(midiAccess);
        var inputs = midiAccess.inputs;
        var outputs = midiAccess.outputs;
        for (var input of midiAccess.inputs.values()){
            input.onmidimessage = getMIDIMessage;
        }
    }

    onMIDIFailure () {
        console.log('Could not access your MIDI devices.');
    }

    //create an array to hold our cc values and init to a normalized value
    cc=Array(128).fill(0.001)


    getMIDIMessage (midiMessage) {
      // 44 bis 51 sind die Pads
        var arr = midiMessage.data
        var index = arr[1]

        if (index == beatTogglerMIDIChannel && arr[2] > 0) {
          if (beatRunning) {
            stopBeat();
            beatRunning = !beatRunning;
          } else {
            startBeat();
            beatRunning = !beatRunning;
          }
        }

        if (index > 43 && index < 52 && arr[2] > 0) { // 8 activeScene pads
          activeScene = index;
          console.log('activeScene is now: ' + index);
          showManager();
        }

        console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
        if (toggleButtons.includes(index)) {
          if (arr[2] > 0) {
            cc[index] = !cc[index];
            console.log("cc[" + index + "] is now: " + cc[index]);
            showManager();
          }
        } else {
        var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0}
        cc[index]=val
      }
    }
}

module.exports = MidiManager;
