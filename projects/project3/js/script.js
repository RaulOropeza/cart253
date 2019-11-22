/*****************

Song Drifter
by Raúl Oropeza

For now is just a basic graphical representation
of a sample sound amplitude.

******************/

let player = {
  angle: 0,
  speed: 6,
  angleIncrement: 0.1,
  x: 0,
  y: 0,
}

let distToMouseY;

// Variables for sound
let song;
let amp;
let volumeHistory = [];
let obstaclesOne = [];
let obstaclesTwo = [];
let waveSpeed = 0;

let pause = true;

function preload() {
  //song = loadSound("assets/sounds/The Dark Side.mp3");
  song = loadSound("assets/sounds/Algorithm.mp3");
  amp = new p5.Amplitude();
}

// Create canvas and set initial position of the player
function setup() {
  createCanvas(500, 500);
  player.x = 50;
  player.y = height / 2;
  mouseY = height / 2;
  testRect = new Obstacle(width, height, 10, 0);
}


// Call all functions
function draw() {
  background(0);
  displaySound();
  drawplayer();

  if (!pause) {
    // Game playing
    handleInput();
    moveplayer();
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

// Create a new obstacle every certain time
window.setInterval(function() {
  /*--------------------------
  First set of obstacles
  --------------------------*/

  // Set the initial values for the new object
  let obstacleOneX = width;
  let obstacleOneHeight = map(amp.getLevel(), 1, 0, 0, height) - 100;
  // Create the new object
  let newObstacleOne = new Obstacle(obstacleOneX, 0, 25, obstacleOneHeight, color(50, random(180, 255), random(180, 255)));
  // Add the new object to the array
  obstaclesOne.push(newObstacleOne);
  // Prevent array from getting bigger than needed
  if (obstaclesOne[0].x < 0) obstaclesOne.splice(0, 1);
}, 3000);
window.setInterval(function() {
  /*--------------------------
  Second set of obstacles
  --------------------------*/

  // Set the initial values for the new object
  let obstacleTwoX = width;
  let obstacleTwoHeight = map(amp.getLevel(), 0, 1, 0, height);
  // Create the new object
  let newObstacleTwo = new Obstacle(obstacleTwoX, height, 25, -obstacleTwoHeight, color(random(180, 255), 50, random(180, 255)));
  // Add the new object to the array
  obstaclesTwo.push(newObstacleTwo);
  // Prevent array from getting bigger than needed
  if (obstaclesTwo[0].x < 0) obstaclesTwo.splice(0, 1);
}, 3000);

// Determine where the player is going to move
function handleInput() {
  // Limit the mouse variable to stay within the canvas
  mouseY = constrain(mouseY, 0, height);
  // Calculate the distance between mouse Y position and the player
  distToMouseY = mouseY - player.y;
  // Transform the angle of rotation based on how far the mouse is from the player
  player.angle = map(distToMouseY, -height / 2, height / 2, -60, 60);
}

// Move the player towards the current direction
function moveplayer() {
  // The magic lines for calculating velocity!
  let vy = player.speed * sin(player.angle);
  player.y += vy;
}

// Draw the player as a yellow triangle
function drawplayer() {
  push();
  translate(player.x, player.y);
  // It's easier for me to work with degrees
  angleMode(DEGREES);
  rotate(player.angle);
  stroke(255);
  strokeWeight(4);
  noFill();
  smooth();
  triangle(-20, -25, -20, 25, 25, 0);
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