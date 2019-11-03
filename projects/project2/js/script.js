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
// The enemies
let enemy = [];
// How many preys will be displayed
let numberOfPreys = 5;
// An array to instance all the preys
let normalPrey = [];

// Image files
let imgPlayer, imgPrey;
let imgEnemy = [];

// preload()
//
// Load the images
function preload() {
  imgPlayer = loadImage("assets/images/ufo.png");
  imgPrey = loadImage("assets/images/cow.png");
  imgEnemy[0] = loadImage("assets/images/fbi.png");
  imgEnemy[1] = loadImage("assets/images/cia.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and all preys
function setup() {
  createCanvas(windowWidth, windowHeight);
  mouseX = width / 2;
  mouseY = height / 2;
  player = new Predator(mouseX, mouseY, 1, imgPlayer, 40);
  laser = new Laser();
  enemy[0] = new Enemy(width, height, 1, imgEnemy[0]);
  // Create all preys at once
  for (let i = 0; i < numberOfPreys; i++) {
    normalPrey[i] = new Prey(random(0, width), random(0, height), random(3, 15), imgPrey, random(10, 80));
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(255);
  for (let i = 0; i < numberOfPreys; i++) {
    // Move all preys
    normalPrey[i].move();
    // Handle the player eating any of the prey
    player.handleEating(normalPrey[i]);
    // Display all preys
    normalPrey[i].display();
  }
  // Shoot the laser when the mouse is pressed and lock player movement
  if (mouseIsPressed) {
    laser.shoot(color(random(200, 255), random(10, 60), 0));
    // Check if the laser hits the enemy
    laser.checkTargetHit(enemy[0]);
  } else {
    // Move the player
    player.move();
  }
  // Display the player
  player.display();
  // Display the enemy
  enemy[0].display();
  // Make enemy chase player
  enemy[0].chase(player);
}

// mousePressed
//
// Calibrate the laser before shooting it
function mousePressed() {
  laser.calibrate(player.x, player.y, mouseX, mouseY);
}