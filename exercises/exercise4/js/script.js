"use strict";

// Pong
// by Pippin Barr and Raúl Oropeza
//
// A "simple" implementation of Pong.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// Game score
let leftScore = 0;
let rightScore = 0;
// Check who scored
let whoScored = false;

// BALL

// A ball object with the properties of
// position, size, velocity, color and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5,
  noise: 0.0
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  // Add a background color that changes with the score
  bgColor: 0
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  // Add a background color that changes with the score
  bgColor: 0
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;
// A variable to hold the font
let bauhausFont;
// preload()
//
// Loads the beep audio for the sound of bouncing and the text font
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  bauhausFont = loadFont('assets/fonts/Bauhaus Medium.otf');
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);
  // Set up the font for all the texts
  textFont(bauhausFont);
  changeBackground();
  displayScore();

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  //  background(bgColor);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    displayScore();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }


  backgroundTheme();
  // We always display the paddles and ball
  fill(187, 29, 44);
  displayPaddle(leftPaddle);
  fill(29, 47, 95);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0 || ball.x > width) {
    // Instructions for right score
    if (ball.x < 0) {
      whoScored = false;
      // Add a point
      rightScore++;
    }
    // Instructions for left score
    if (ball.x > 0) {
      whoScored = true;
      // Add a point
      leftScore++;
    }
    changeBackground();
    return true;
  } else {
    return false;
  }
}

// changeBackground()
//
// Changes the background depending on who scored
function changeBackground() {
  if (whoScored) {
    // Makes the first half of the screen have a lighter color and the second half a darker one
    rightPaddle.bgColor = 25;
    leftPaddle.bgColor = 230;
  } else {
    // Makes the first half of the screen have a darker color and the second half a lighter one
    leftPaddle.bgColor = 25;
    rightPaddle.bgColor = 230;
  }
}

// backgroundTheme()
//
// A Bauhaus theme
function backgroundTheme() {
  push();
  rectMode(CORNER);
  fill(rightPaddle.bgColor);
  arc(width / 2, height / 2, 250, 250, PI / 2, -PI / 2);
  fill(leftPaddle.bgColor);
  arc(width / 2, height / 2, 250, 250, -PI / 2, PI / 2);

  textAlign(CENTER, CENTER);
  textSize(40);
  fill(leftPaddle.bgColor);
  text("Bau", width / 2 - 40, height / 2 - 6);
  fill(rightPaddle.bgColor);
  text("haus", width / 2 + 48, height / 2 - 6);
  pop();
}

// displayScore()
//
// Shows the score for both players
function displayScore() {
  // Add a background color that changes with the score
  push();
  // Left paddle
  fill(leftPaddle.bgColor);
  rect(width * 0.25, height / 2, width / 2, height);
  // Right paddle
  fill(rightPaddle.bgColor);
  rect(width * 0.75, height / 2, width / 2, height);
  pop();

  // Display the score
  push();
  // Set the format of the text
  textAlign(CENTER, CENTER);
  textSize(30);
  textStyle(BOLD);
  // Display the left score
  fill(rightPaddle.bgColor);
  text(leftScore, width * 0.25, height * 0.07);
  // Display the right score
  fill(leftPaddle.bgColor);
  text(rightScore, width * 0.75, height * 0.93);
  pop();
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y - ball.size / 2 <= 0 || ball.y + ball.size / 2 >= height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  paddle.y = constrain(paddle.y, paddle.h / 2 + 8, height - paddle.h / 2 - 8); // Constrain the movement in the Y axis
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square and changes its color depending on the background
function displayBall() {
  // Draw the ball with a random size using Perlin noise
  ball.noise += 0.01;
  ball.size = 10 + (noise(ball.noise) * 70);
  push();
  fill(247, 215, 19);
  rect(ball.x, ball.y, ball.size, ball.size);
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;
  // Throw the ball towards who scored the last point
  if (whoScored) {
    ball.vx = -ball.speed;
  } else {
    ball.vx = ball.speed;
  }

  // Throw the ball at a random Y speed
  ball.vy = int(random(1, 11));
  // Here I used a pro move that I remembered, to assign a conditional value to a variable
  // The point here is to have a 50 - 50 chance for the ball to be thrown upwards
  ball.vy = ball.vy > 6 ? -ball.vy : ball.vy; // I'm very proud of this line of code! Haha
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("CLICK TO START", width / 2, height * 0.9);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}