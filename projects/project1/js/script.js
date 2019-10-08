"use strict";

/******************************************************

Game - Chaser
Pippin Barr and Raúl Oropeza

A "simple" game of cat and mouse. The player is the democrat party and can move with keys,
if they overlap the (randomly moving) prey (voters) they "eat them" by sucking out its life
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
let playerAcceleration = 3;
// Player deceleration when not holding any key
let playerDeceleration = 0.9;

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
let enemyStart = 5;
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
let streakNeeded = 1;
// How long (in seconds) will the streak reward will last
let timer = 6;

// Variables for the images
let imgPlayer;
let imgEnemy;
let imgPrey;
let imgBackground;
let imgTrump;

// Variables for sound
let soundGameOver;

// preload()
//
// Preloads the sounds and images
function preload() {
  preloadImages();
  preloadSound();
}

// preloadImages()
//
// Sets the files for the images
function preloadImages() {
  imgPlayer = loadImage("assets/images/dems.png");
  imgEnemy = loadImage("assets/images/reps.png");
  imgPrey = loadImage("assets/images/voters.png");
  imgBackground = loadImage("assets/images/white_house.png");
  imgTrump = loadImage("assets/images/trump.png");
}

// preloadSound
//
// Sets the files for sounds
function preloadSound() {
  soundGameOver = loadSound("assets/sounds/GameOverMusic.mp3");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);
  imageMode(CENTER);
  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  setupEnemy();
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
  // Set the background to be a very poor photoshop-made drawing of the white house
  tint(255, 255);
  image(imgBackground, width / 2, height / 2, 500, 500);

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
    if (playerVX > -playerMaxSpeed) playerVX -= 0.1 * playerAcceleration;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // The speed of the horizontal movement will increase slowly until it reaches the maximum speed
    if (playerVX < playerMaxSpeed) playerVX += 0.1 * playerAcceleration;
  } else {
    // Since we've implemented acceleration, I wanted to make the player's movement more natural implementing deceleration
    // I used a different variable for this because I wanted it to decelerate faster than it accelerates

    // Decelerate horizontal movement when neither RIGHT_ARROW nor LEFT_ARROW are pressed
    playerVX *= playerDeceleration;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    // The value of the vertical movement will decrease slowly until it reaches the maximum speed
    if (playerVY > -playerMaxSpeed) playerVY -= 0.1 * playerAcceleration;
  } else if (keyIsDown(DOWN_ARROW)) {
    // The speed of the horizontal movement will increase slowly until it reaches the maximum speed
    if (playerVY < playerMaxSpeed) playerVY += 0.1 * playerAcceleration;
  } else {
    // Decelerate vertical movement when neither UP_ARROW nor DOWN_ARROW are pressed
    playerVY *= playerDeceleration;
  }

  // Sprint
  if (keyIsDown(SHIFT)) {
    // Increase the player max speed to make a sprint
    playerMaxSpeed = 8;
  } else {
    // Reset max speed
    playerMaxSpeed = 4;
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
    playerMaxSpeed = 15;
    playerRadius = 60;
    playerAcceleration = 50;
    playerDeceleration = 0.7;

    push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("IMPEACHMENT CHARGE!!!", width / 2, height * 0.9);
    pop();
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

      playerMaxSpeed = 4;
      playerRadius = 25;
      playerAcceleration = 3;
      playerDeceleration = 0.9;
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
// Draw the prey as the voters with alpha based on health
function drawPrey() {
  preyFill = map(preyHealth, preyMaxHealth, 0, 255, 0);
  tint(255, 255, 0, preyFill);
  //ellipse(preyX, preyY, preyRadius * 2);

  image(imgPrey, preyX, preyY, preyRadius * 2, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as the Democratic Party with alpha value based on health
function drawPlayer() {
  tint(255, playerHealth);
  //ellipse(playerX, playerY, playerRadius * 2);
  image(imgPlayer, playerX, playerY, playerRadius * 2, playerRadius * 2);
}

// drawEnemy()
//
// Draw the enemy as the Republican Party
function drawEnemy() {
  tint(255);
  //ellipse(enemyX, enemyY, enemyRadius * 2);
  image(imgEnemy, enemyX, enemyY, enemyRadius * 2, enemyRadius * 2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Change background to be white
  background(255, 0, 0);
  // Add a Trump propaganda-like border
  push();
  rectMode(CENTER);

  strokeWeight(5);
  stroke(255);
  noFill();
  rect(width / 2, height / 2, width * 0.92, height * 0.92);

  noStroke();
  fill(255, 0, 0);
  rect(width / 2, height / 2, width / 3, height);
  pop();

  // Starts playing the game over music only if it's not already playing
  if (!soundGameOver.isPlaying()) soundGameOver.play();
  // Set up the font
  textAlign(CENTER, CENTER);

  // Setup and display the GAME OVER text
  textSize(44);
  textStyle(BOLD);
  fill(255);
  text("GAME OVER", width / 2, height * 0.2);

  // Display Trump in the middle of the canvas
  image(imgTrump, width / 2, height * 0.5, width * 0.45, height * 0.45);

  // Show the result of the election
  textSize(22);
  text("TRUMP HAS BEEN RE-ELECTED", width / 2, height * 0.79);

  // Setup the result text
  textSize(15);
  textStyle(NORMAL);
  // Just a little conditional to make the word "voter" in the result is written in it's singular form if the score is 1, slightly OCD perhaps...
  if (preyEaten === 1) {
    text("You won " + preyEaten + " new voter before you died", width / 2, height * 0.835);
  } else {
    text("You won " + preyEaten + " new voters before you died", width / 2, height * 0.835);
  }
}