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

// Visual trackers of sound amplitude
//
// Square
let visualSoundX;
let visualSoundY;
let visualSoundSize = 5;
// Circle
let visualSound2X;
let visualSound2Y;
let visualSound2Size;

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
  visualSoundX = 0;
  visualSound2X = width * 0.66;
  visualSound2Y = width / 3;
  sound.play();
}


// draw()
//
// Change y position in relation to amplitude

function draw() {
  noStroke();
  let level = amp.getLevel();
  let visualSoundY = map(level, 0, 1, height, 0) - visualSoundSize;
  let philCollins = map(level, 0, 0.2, 20, 255); // Named the variable like that because it sounds a lot like fillColor, or at least in my head it does

  // Make the square fade away as amplitude decreases
  fill(philCollins);
  rect(visualSoundX, visualSoundY, visualSoundSize, visualSoundSize);
  // Make position in x increase to kind of "track" sound
  visualSoundX++;

  // A yellow sun-like circle
  fill(255, 255, 180);
  stroke(0);
  ellipseMode(CENTER);
  visualSound2Size = map(level, 0, 0.2, 50, 100);
  ellipse(visualSound2X, visualSound2Y, visualSound2Size, visualSound2Size);
}