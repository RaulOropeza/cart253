/*****************

Flappy Songs
by Raúl Oropeza

A "Flappy Bird" style game but
the obstacles are determined by
the current amplitude of a song.


******************/

// Variable to instance a PLayer
let player;
// Determines what's the current state of the game
let currentState = 0;
// Variable to load the font
let fontSulphurPoint;
// Store the score
let score = 0;
// Variables for sound
let songFinished;
let song,
  myCallback = function() {
    songFinished = true; // A value that will be called later in the code
  }
let amp;
let fft;
// Obstacles of the game
let obstaclesOne = [];
let obstaclesTwo = [];
// Determines whether the game is paused or not
let pause = true;

// Load assets
function preload() {
  fontSulphurPoint = loadFont("assets/fonts/SulphurPoint-Regular.ttf");
  song = loadSound("assets/sounds/The Dark Side.mp3");
  song.onended(myCallback); // Check if the sound ended
  amp = new p5.Amplitude();
}

// Create canvas and give default values to the Player
function setup() {
  createCanvas(500, 500);
  textFont(fontSulphurPoint);
  player = new Player(50, height / 2, 65, "assets/images/Murph.png");
  // FFT object for sound visualization
  fft = new p5.FFT(0.9);
  fft.setInput(song);
}

// Call all functions
function draw() {
  switch (currentState) {
    case 0:
      gamePlaying();
      break;
    case 1:
      gameOver();
      break;
      break;
    case 2:
      gameCompleted();
      break;
  }
}

// Interact with sound
function displayObstactles() {
  // Display the obstacles on the top of the canvas
  for (let i = 0; i < obstaclesOne.length; i++) {
    obstaclesOne[i].display();
    obstaclesOne[i].checkCollisionOne();
    // Move the obstacles towards the player
    if (!pause) obstaclesOne[i].x -= 3;
  }
  // Display the obstacles at the bottom of the canvas
  for (let i = 0; i < obstaclesTwo.length; i++) {
    obstaclesTwo[i].display();
    obstaclesTwo[i].checkCollisionTwo();
    // Move the obstacles towards the player
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

window.setInterval(function() { // Increase the score every second
  if (!pause && currentState === 0) {
    score++;
  }
}, 1000);

// Create a visual representation of the song that is being played
function soundDisplay() {
  // Analyze the values of the song
  let wave = fft.analyze();
  push();
  rectMode(CENTER);
  // Draw rectangles with changing opacity that will grow/shrink
  // according to the frequency spectrum of the sound
  for (i = 0; i < wave.length; i++) {
    noStroke();
    fill(130, 240, 255, map(amp.getLevel(), 0, 1, 5, 40));
    rect(i, 0, 5, map(wave[i], -0, 255, 0, 200), 20);

    fill(240, 130, 255, 60);
    rect(map(i, 0, width, width, 0), height, 5, map(wave[i], 0, 255, 0, 200), 20);
  }
  pop();
}


// All the instructions for when the game is playing
function gamePlaying() {
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
    textSize(26);
    text("CLICK TO PLAY", width / 2, height / 2 - 12);
    textSize(15);
    text("USE SPACEBAR TO JUMP", width / 2, height / 2 + 12);
    pop();
  }
  // Display the winning screen if the song is completed
  if (songFinished && currentState === 0) {
    currentState = 2;
  }
}
// Winning screen
function gameCompleted() {
  background(10, 20, 40);
  song.stop();
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("CONGRATULATIONS!", width / 2, height / 2 - 12);
  textSize(15);
  text("TOTAL TIME ALIVE " + score + "s", width / 2, height / 2 + 12);
  textSize(12);
  text("PRESS R TO RESTART", width / 2, height * 0.95);
  pop();
}

// Game Over screen
function gameOver() {
  background(10, 20, 40);
  song.stop();
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("GAME OVER", width / 2, height / 2 - 12);
  textSize(15);
  text("TOTAL TIME ALIVE " + score + "s", width / 2, height / 2 + 12);
  textSize(12);
  text("PRESS R TO RESTART", width / 2, height * 0.95);
  pop();
}

function displayScore() {
  // Show the current score on the top right corner,
  // made it dance a little
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

// Set game values to default
function restartGame() {
  setup();
  songFinished = false;
  song.pause();
  currentState = 0;
  score = 0;
  pause = true;
  obstaclesOne = [];
  obstaclesTwo = [];
}

// Instructions for when mouse is pressed
function mousePressed() {
  // Unpause the game
  if (pause) {
    pause = false;
    song.play();
  }
}

function keyPressed() {
  // Make the player jump whit the spacebar
  if (keyCode === 32 && !pause) {
    player.liftPlayer();
  }
  // Restart the game with R
  if (keyCode === 82 && currentState != 0) {
    restartGame();
  }
}