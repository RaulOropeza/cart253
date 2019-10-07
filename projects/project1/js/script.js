"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 4;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;
// Player acceleration when holding down key
let playerAcceleration = 0.05;
// Player deceleration when not holding any key
let playerDeceleration = 0.1;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyMaxSpeed = 0.01;
// Prey Perlin noise value
let pX;
let pY;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey tone color
let preyFill;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// Starting position of the enemy
let enemyX;
let enemyY;
// Number of preys the player has to eat in order to make enemy appear
let enemyStart = 0;
// Speed at which the enemy is going to move
let enemySpeed = 0.002;
// Starting size of the enemy
let enemyRadius = 35;
// Amount of speed increase every time it eats a prey
let enemySpeedIncrease = 0.0005;

// Counter for streak
let streakCounter = 0;
// Determine if the streak is active or not
let streakOn = false;
// How big must the streak be to get the reward
let streakNeeded = 5;
// How long (in seconds) will the streak reward will last
let timer = 6;

// Variables for the images
let imgPlayer;
let imgEnemy;
let imgPrey;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);
  setupImages();

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  setupEnemy();
}

// setupImages()
//
// Sets the files for the images
function setupImages() {
  imgPlayer = loadImage("assets/images/dems.png");
  imgEnemy = loadImage("assets/images/reps.png");
  imgPrey = loadImage("assets/images/voters.png");
}

// setupPrey()
//
// Initialises prey's Perlin noise and health
function setupPrey() {
  // Here we just need to generate a random starting Perlin noise value for the prey's movement
  // because it's position depends on that value
  pX = random(0, 100);
  pY = random(0, 100);
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// setupEnemy
//
// Initialises enemy position, size and speed
function setupEnemy() {
  // Start the enemy off canvas
  enemyX = -enemyRadius;
  enemyY = -enemyRadius;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100, 100, 100);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();
    moveEnemy();

    updateHealth();
    checkEating();

    drawPrey();
    drawEnemy();
    drawPlayer();

    checkStreak();
  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    // The value of the horizontal movement will decrease slowly until it reaches the maximum speed
    if (playerVX > -playerMaxSpeed) playerVX -= playerAcceleration * playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // The speed of the horizontal movement will increase slowly until it reaches the maximum speed
    if (playerVX < playerMaxSpeed) playerVX += playerAcceleration * playerMaxSpeed;
  } else {

    // Since we've implemented acceleration, I wanted to make the player movement more natural implementing also deceleration
    // I used a different variable for this because I wanted it to decelerate faster than it accelerates

    // When no key is being pressed, the horizontal speed will slow down until it reaches 0
    if (playerVX > 0) playerVX -= playerDeceleration;
    if (playerVX < 0) playerVX += playerDeceleration;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    // The value of the vertical movement will decrease slowly until it reaches the maximum speed
    if (playerVY > -playerMaxSpeed) playerVY -= playerAcceleration * playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    // The speed of the horizontal movement will increase slowly until it reaches the maximum speed
    if (playerVY < playerMaxSpeed) playerVY += playerAcceleration * playerMaxSpeed;
  } else {

    // When no key is being pressed, the vertical speed will slow down until it reaches 0
    if (playerVY > 0) playerVY -= playerDeceleration;
    if (playerVY < 0) playerVY += playerDeceleration;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// moveEnemy()
//
// Make the enemy move towards the prey
function moveEnemy() {
  // The enemy starts to move when the player has eaten 5 preys
  if (preyEaten >= enemyStart) {
    // Calculate the distance between enemy's and prey's position
    let dx = preyX - enemyX;
    let dy = preyY - enemyY;

    // Make the enemy chase the prey
    enemyX += dx * enemySpeed;
    enemyY += dy * enemySpeed;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
// Check if enemy overlaps prey, enemy's health doesn't change
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Restart the health of the prey and create a new one in a random position
      setupPrey();
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;

      // Only evaluate streak if not already on a streak
      if (!streakOn) {
        // Increases counter for streak only if the prey is eaten while the player's health is at least 200
        if (playerHealth >= 200) {
          streakCounter++;
        } else {
          streakCounter = 0;
        }
      }
    }
  }

  // Make enemy eat prey

  // Get distance of enemy to prey
  let distEnemy = dist(enemyX, enemyY, preyX, preyY);
  // Check if it's an overlap
  if (distEnemy < enemyRadius + preyRadius) {
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Restart the health of the prey and create a new one in a random position
      setupPrey();
      // Increase enemy speed
      enemySpeed += enemySpeedIncrease;
    }
  }
}

// streak()
//
// Changes movement of the player for a limited time
function checkStreak() {
  // Streak reward will activate when the number of prey eaten is the required
  if (streakCounter >= streakNeeded) {
    // Activate the streak reward...
    streakOn = true;

    // ... which is to make the player bigger, better and faster
    playerAcceleration = 1;
    playerDeceleration = 1;
    playerMaxSpeed = 8;
    playerRadius = 60;

    // Start the timer
    if (frameCount % 60 === 0 && timer > 0) {
      console.log(timer);
      timer--;
    }

    // When the timer gets to 0, reset all the values to normal
    if (timer === 0) {
      streakOn = false;
      streakCounter = 0;
      timer = 6;

      playerAcceleration = 0.05;
      playerDeceleration = 0.1;
      playerMaxSpeed = 4;
      playerRadius = 25;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Set the prey's position to be dynamic in relation of the Perlin noise value
  // The value 1.5 is to make the noise range to include an extra third of the canvas
  // to make the prey eventually move towards the borders
  preyX = 1.5 * width * noise(pX);
  preyY = 1.5 * height * noise(pY);

  // Adds the speed value to the variable that the Perlin noise is going to use in the next frame
  pX += preyMaxSpeed;
  pY += preyMaxSpeed;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  preyFill = map(preyHealth, preyMaxHealth, 0, 255, 0);
  tint(255, preyFill);
  //ellipse(preyX, preyY, preyRadius * 2);

  image(imgPrey, preyX, preyY, preyRadius * 2, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  tint(255, playerHealth);
  //ellipse(playerX, playerY, playerRadius * 2);
  image(imgPlayer, playerX, playerY, playerRadius * 2, playerRadius * 2);
}

// drawEnemy()
//
// Draw the enemy as a black ellipse
function drawEnemy() {
  tint(255);
  //ellipse(enemyX, enemyY, enemyRadius * 2);
  image(imgEnemy, enemyX, enemyY, enemyRadius * 2, enemyRadius * 2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}