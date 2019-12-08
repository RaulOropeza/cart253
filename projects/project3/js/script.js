/*****************

Flappy Songs
by Raúl Oropeza

A simple "Flappy Bird" style game
where the obstacles are determined by
the current amplitude of a song.

******************/

let player;

let fontSulphurPoint;

let score = 0;

// Variables for sound
let song;
let amp;
let fft;
let obstaclesOne = [];
let obstaclesTwo = [];

let pause = true;

function preload() {
  fontSulphurPoint = loadFont("assets/fonts/SulphurPoint-Regular.ttf");

  song = loadSound("assets/sounds/The Dark Side.mp3");
  //song = loadSound("assets/sounds/Algorithm.mp3");
  amp = new p5.Amplitude();
}

// Create canvas and set initial position of the player
function setup() {
  createCanvas(500, 500);
  textFont(fontSulphurPoint);
  player = new Player(50, height / 2, 65, "assets/images/Murph.png");
  mouseY = height / 2;
  testRect = new Obstacle(width, height, 10, 0);
  fft = new p5.FFT(0.9);
  fft.setInput(song);
}

// Call all functions
function draw() {
  background(10, 20, 40);
  displayObstactles();
  soundDisplay();
  player.display();
  if (!pause) {
    // Game playing
    player.movePlayer();
    displayScore();
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
function displayObstactles() {
  for (let i = 0; i < obstaclesOne.length; i++) {
    obstaclesOne[i].display();
    obstaclesOne[i].checkCollisionOne();
    if (!pause) obstaclesOne[i].x -= 3;
  }

  for (let i = 0; i < obstaclesTwo.length; i++) {
    obstaclesTwo[i].display();
    obstaclesTwo[i].checkCollisionTwo();
    if (!pause) obstaclesTwo[i].x -= 3;
  }
}

window.setInterval(function() { // Create a new obstacle every certain time
  /*--------------------------
  First set of obstacles
  --------------------------*/
  // Set the initial values for the new obstacle
  let obstacleOneX = width;
  let obstacleOneHeight = map(amp.getLevel(), 1, 0, 0, height) - 160;
  // Create the new object
  let newObstacleOne = new Obstacle(obstacleOneX, 0, 40, obstacleOneHeight, color(50, random(180, 255), random(180, 255)));
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
  let newObstacleTwo = new Obstacle(obstacleTwoX, height, 40, -obstacleTwoHeight, color(random(180, 255), 50, random(180, 255)));
  // Add the new object to the array
  obstaclesTwo.push(newObstacleTwo);
  // Prevent array from getting bigger than needed
  if (obstaclesTwo[0].x < 0) obstaclesTwo.splice(0, 1);
}, 2000);

window.setInterval(function() {
  if (!pause) {
    // Game playing
    score++;
  }
}, 1000);

function soundDisplay() {
  let wave = fft.analyze();
  push();
  rectMode(CENTER);
  beginShape();
  vertex(width, 0);
  for (i = 0; i < wave.length; i++) {
    noStroke();
    fill(130, 240, 255, map(amp.getLevel(), 0, 1, 5, 40));
    rect(i, 0, 5, map(wave[i], -0, 255, 0, 200), 20);

    fill(240, 130, 255, 60);
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

function displayScore() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(map(amp.getLevel(), 0, 1, 10, 40));
  translate(width * 0.9, height / 10);
  angleMode(DEGREES);
  rotate(45);
  text("Time alive " + score, 0, 0);
  pop();
}

function keyPressed() {
  if (keyCode === 32 && !pause) {
    player.liftPlayer();
  }
}