/*****************

Song Jumper
by Raúl Oropeza

For now is just a basic graphical representation
of a sample sound amplitude.

******************/
// Variable for sample sound
let sound;

// Variable for amplitude
let amp;

// Visual tracker of sound amplitude (a square for now)
let visualSoundX = 0;
let visualSoundY;
let visualSoundSize = 5;

// preload()
//
// Load sound and create object for amplitude

function preload() {
  sound = loadSound("assets/sounds/sample.wav");
  amp = new p5.Amplitude();
}


// setup()
//
// Play sound and set the position in X

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  sound.play();
}


// draw()
//
// Description of draw()

function draw() {
  fill(255);
  noStroke();
  let level = amp.getLevel();
  let visualSoundY = map(level, 0, 1, height, 0) - visualSoundSize;
  rect(visualSoundX, visualSoundY, visualSoundSize, visualSoundSize);
  // Make position in x increase to kind of "track" sound
  visualSoundX++;
}