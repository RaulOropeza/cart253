/*****************

Song Drifter
by Raúl Oropeza

For now is just a basic graphical representation
of a sample sound amplitude.

******************/

let player;

// Variables for sound
let song;
let amp;
let fft, peakDetect;
let volumeHistory = [];
let obstaclesOne = [];
let obstaclesTwo = [];
let waveSpeed = 0;

let pause = true;

function preload() {
  song = loadSound("assets/sounds/The Dark Side.mp3");
  //song = loadSound("assets/sounds/Algorithm.mp3");
  amp = new p5.Amplitude();
}

// Create canvas and set initial position of the player
function setup() {
  createCanvas(500, 500);
  player = new Player(50, height / 2);
  mouseY = height / 2;
  testRect = new Obstacle(width, height, 10, 0);
  fft = new p5.FFT(0.9);
  fft.setInput(song);
}

// Call all functions
function draw() {
  background(10, 20, 40);
  displaySound();
  soundDisplay();
  player.display();
  if (!pause) {
    // Game playing
    player.movePlayer();
  } else {
    // Game paused
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(24);
    text("CLICK TO PLAY", width / 2, height / 2);
    pop();
  }
}

// Interact with sound
function displaySound() {
  for (let i = 0; i < obstaclesOne.length; i++) {
    obstaclesOne[i].display();
    obstaclesOne[i].checkCollisionOne();
    if (!pause) obstaclesOne[i].x--;
  }

  for (let i = 0; i < obstaclesTwo.length; i++) {
    obstaclesTwo[i].display();
    obstaclesTwo[i].checkCollisionTwo();
    if (!pause) obstaclesTwo[i].x--;
  }
}

/*--------------------------
First set of obstacles
--------------------------*/
window.setInterval(function() { // Create a new obstacle every certain time
  // Set the initial values for the new obstacle
  let obstacleOneX = width;
  let obstacleOneHeight = map(amp.getLevel(), 1, 0, 0, height) - 100;
  // Create the new object
  let newObstacleOne = new Obstacle(obstacleOneX, 0, 60, obstacleOneHeight, color(50, random(180, 255), random(180, 255)));
  // Add the new object to the array
  obstaclesOne.push(newObstacleOne);
  // Prevent array from getting bigger than needed
  if (obstaclesOne[0].x < 0) obstaclesOne.splice(0, 1);

  /*--------------------------
  Second set of obstacles
  --------------------------*/
  // Set the initial values for the new obstacle
  let obstacleTwoX = width;
  let obstacleTwoHeight = map(amp.getLevel(), 0, 1, 0, height);
  // Create the new object
  let newObstacleTwo = new Obstacle(obstacleTwoX, height, 60, -obstacleTwoHeight, color(random(180, 255), 50, random(180, 255)));
  // Add the new object to the array
  obstaclesTwo.push(newObstacleTwo);
  // Prevent array from getting bigger than needed
  if (obstaclesTwo[0].x < 0) obstaclesTwo.splice(0, 1);
}, 5000);

function soundDisplay() {
  let wave = fft.analyze();
  push();
  rectMode(CENTER);
  beginShape();
  vertex(width, 0);
  for (i = 0; i < wave.length; i++) {
    noStroke();
    fill(130, 240, 255, 70);
    rect(i, 0, 5, map(wave[i], -0, 255, 0, 200), 20);
    //rect(map(i, 0, width, width, 0), 0, 5, map(wave[i], 0, 255, 0, 150), 20);

    fill(240, 130, 255, 70);
    //rect(i, height, 5, map(wave[i], -0, 255, 0, 200), 20);
    rect(map(i, 0, width, width, 0), height, 5, map(wave[i], 0, 255, 0, 200), 20);
  }
  vertex(width, height);
  endShape();
  pop();
}

// Instructions for when mouse is pressed
function mousePressed() {
  if (pause) {
    pause = false;
    song.play();
  } else {
    pause = true;
    song.pause();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.liftPlayer();
  }
  //return false;
}