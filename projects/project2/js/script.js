// Predator-Prey Simulation
// by Pippin Barr and Raúl Oropeza
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let player;
// The deadly laser
let laser;
// Number of prey eaten before enemy shows
let startEnemyReq = 3;
// How many enemies will be displayed
let numberOfEnemies = 8;
// An array to instance all the enemies
let enemy = [];
// How many preys will be displayed
let numberOfPreys = 8;
// An array to instance all the preys
let normalPrey = [];
// Image files
let imgPlayer, imgPrey, bgImg;
let imgEnemy = [];
// Interface control
let currentScreen = 0;
// Font
let aileronSemiBold;
let aileronBold;
// Sounds
let sndScore;
let sndEnemyDeath;
let sndLaser;

// preload()
//
// Load the images, sounds and font
function preload() {
  imgPlayer = loadImage("assets/images/ufo.png");
  imgPrey = loadImage("assets/images/cow.png");
  imgEnemy[0] = loadImage("assets/images/fbi.png");
  imgEnemy[1] = loadImage("assets/images/cia.png");
  bgImg = loadImage("assets/images/background.png");
  aileronSemiBold = loadFont("assets/fonts/Aileron-SemiBold.otf");
  aileronBold = loadFont("assets/fonts/Aileron-Bold.otf");
  sndScore = loadSound("assets/sounds/score.wav");
  sndEnemyDeath = loadSound("assets/sounds/enemy_killed.wav");
  sndLaser = loadSound("assets/sounds/laser.wav");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and all preys
function setup() {
  createCanvas(1280, 720);
  mouseX = width / 2;
  mouseY = height / 2;
  player = new Predator(mouseX, mouseY, 2, imgPlayer, 50);
  laser = new Laser(player);

  // Create all preys at once
  for (let i = 0; i < numberOfPreys; i++) {
    normalPrey[i] = new Prey(random(0, width), random(0, height), random(3, 15), imgPrey, random(20, 40));
  }

  // Create all enemies at once
  for (let j = 0; j < numberOfEnemies; j++) {
    enemy[j] = new Enemy();
    enemy[j].prepare();
  }
}

// draw()
//
// Display the interface
function draw() {
  interfaceControl();
}

// interfaceControl
//
// Controls the current displayed screen
function interfaceControl() {
  switch (currentScreen) {
    case 0:
      startScreen();
      break;
    case 1:
      playing();
      break;
    case 2:
      gameOver();
      break;
    default:
      startScreen();
  }
}

// startScreen
//
// Display the starting screen
function startScreen() {
  push();
  background(220, 25, 25);
  textAlign(CENTER, TOP);
  textSize(250);
  textFont(aileronSemiBold);
  fill(255);
  text("press enter", width * 0.491, -75);
  textFont(aileronBold);
  textAlign(RIGHT, TOP);
  fill(15);
  textSize(30);
  text("you're an ufo\nmove with mouse\neat cows\nkill agents\nshoot with ctrl + click", width * 0.97, height * 0.27);
  textAlign(LEFT, CENTER);
  textSize(25);
  fill(255, 255);
  text("your laser improves as you eat cows", width * 0.005, height * 0.83);
  fill(255, 205);
  text("you move faster as you kill agents", width * 0.005, height * 0.87);
  fill(255, 155);
  text("agents move faster with every respawn", width * 0.005, height * 0.91);
  fill(255, 105);
  text("game ends when you run out of health", width * 0.005, height * 0.95);
  pop();
  // Go to game screen
  if (keyIsDown(13)) {
    currentScreen = 1;
    // Restart all values
    setup();
  }
}

// playing
//
// Play the game
function playing() {
  // Set the background
  background(0, 170, 100);
  // image(bgImg, 0, 0);
  for (let i = 0; i < numberOfPreys; i++) {
    // Move all preys
    normalPrey[i].move();
    // Handle the player eating any of the prey
    player.handleEating(normalPrey[i]);
    // Display all preys
    normalPrey[i].display();
  }
  // Enemy appears at certain score
  if (player.score >= startEnemyReq) {
    for (let j = 0; j < numberOfEnemies; j++) {
      // Display the enemies
      enemy[j].display();
      // Make enemies chase player
      enemy[j].chase(player);
    }
  }
  // Shoot the laser when the mouse is pressed and player movement locked
  if (mouseIsPressed && !player.isMoving) {
    laser.shoot(color(random(200, 255), random(10, 60), 0));
    for (let j = 0; j < numberOfEnemies; j++) {
      // Check if the laser hits an enemy
      laser.checkTargetHit(enemy[j]);
    }
  }
  // Move the player
  player.move();
  // Display the player
  player.display();
}

// gameOver
//
// Display Game Over screen
function gameOver() {
  push();
  background(150);
  textAlign(CENTER, CENTER);
  textFont(aileronSemiBold);
  textSize(450);
  fill(255);
  text("game", width / 2, height * 0.1);
  textSize(300);
  fill(0);
  text("over", width * 0.72, height * 0.48);
  textSize(35);
  fill(0);
  text("you ate " + player.score + " cows", width * 0.83, height * 0.725);
  textSize(18);
  fill(250);
  text("press f to start again", width * .858, height * .78);
  pop();
  // Return to start screen when key F is pressed
  if (keyIsDown(70)) {
    currentScreen = 0;
  }
}

// mousePressed
//
// Mouse press instructions
function mousePressed() {
  // Calibrate the laser before shooting it
  if (!player.isMoving && currentScreen === 1) laser.calibrate(player.x, player.y, mouseX, mouseY);
}