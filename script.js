//get all html elements
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let modulationFrequencySlider = document.getElementById("modulationFrequencySlider");
let carrierFrequencySlider = document.getElementById("carrierFrequencySlider");
let depthSlider = document.getElementById("depthSlider");
let volumeSlider = document.getElementById("volumeSlider");

//create oscillators, constant, and depth gain node
const audioContext = new AudioContext();

let carrier = audioContext.createOscillator();
carrier.frequency.value = 440;


let modulator = audioContext.createOscillator();
modulator.type = "sine";
modulator.frequency.value = modulationFrequencySlider.value;


let depthGain = audioContext.createGain();
depthGain.gain.value = 0;


let masterGain = audioContext.createGain();
masterGain.gain.value = volumeSlider.value;



//connecting all the elements
modulator.connect(depthGain);
depthGain.connect(carrier.frequency)
carrier.connect(masterGain);
masterGain.connect(audioContext.destination)




//start and stop button functions
const startAudio = function () {
    carrier.start();
    modulator.start();
};

const stopAudio = function() {
    carrier.stop();
    modulator.stop();
}


//slider update functions
const updateCarrierFrequency = function (f) {
  carrier.frequency.value = f;
  console.log("Carrier Frequency Offset: " + f);
};

const updateModulationFrequency = function (f) {
  modulator.frequency.value = f;
  console.log("Modulation Frequency: " + f);
};

const updateDepth = function (f) {
    depthGain.gain.value = f;
    console.log("Depth: " + f);
}

const updateVolume = function(f) {
    masterGain.gain.value = f;
    console.log("Volume: " + f);

}




//event listeners for inputs
startButton.addEventListener("click", startAudio);
stopButton.addEventListener("click", stopAudio);
modulationFrequencySlider.addEventListener("input", () => updateModulationFrequency(modulationFrequencySlider.value));
carrierFrequencySlider.addEventListener("input", () => updateCarrierFrequency(carrierFrequencySlider.value));
depthSlider.addEventListener("input", () => updateDepth(depthSlider.value));
volumeSlider.addEventListener("input", () => updateVolume(volumeSlider.value));
