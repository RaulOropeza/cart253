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
let startEnemyReq = 0;
// How many enemies will be displayed
let numberOfEnemies = 5;
// An array to instance all the enemies
let enemy = [];
// How many preys will be displayed
let numberOfPreys = 5;
// An array to instance all the preys
let normalPrey = [];

// Image files
let imgPlayer, imgPrey, bgImg;
let imgEnemy = [];
// preload()
//
// Load the images
function preload() {
  imgPlayer = loadImage("assets/images/ufo.png");
  imgPrey = loadImage("assets/images/cow.png");
  imgEnemy[0] = loadImage("assets/images/fbi.png");
  imgEnemy[1] = loadImage("assets/images/cia.png");
  bgImg = loadImage("assets/images/background.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and all preys
function setup() {
  createCanvas(1280, 720);
  mouseX = width / 2;
  mouseY = height / 2;
  player = new Predator(mouseX, mouseY, 1, imgPlayer, 50);
  laser = new Laser();

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
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Set the background
  image(bgImg, 0, 0);
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

// mousePressed
//
// Mouse press instructions
function mousePressed() {
  // Calibrate the laser before shooting it
  if (!player.isMoving) laser.calibrate(player.x, player.y, mouseX, mouseY);
}