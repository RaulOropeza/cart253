// Predator-Prey Simulation
// by Pippin Barr and Raúl Oropeza
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let player;

// How many preys will be displayed
let numberOfPreys = 5;
// An array to instance all the preys
let normalPrey = [];

// setup()
//
// Sets up a canvas
// Creates objects for the predator and all preys
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Predator(100, 100, 1, color(200, 200, 0), 40);
  // Create all preys at once
  for (let i = 0; i < numberOfPreys; i++) {
    normalPrey[i] = new Prey(random(0, width), random(0, height), random(5, 30), color(random(0, 255), random(0, 255), random(0, 255)), random(10, 80));
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);
  // Move the player
  player.move();
  for (let i = 0; i < numberOfPreys; i++) {
    // Move all preys
    normalPrey[i].move();
    // Handle the player eating any of the prey
    player.handleEating(normalPrey[i]);
    // Display all preys
    normalPrey[i].display();
  }

  player.fire(normalPrey[0]);
  // Display all the player
  player.display();
}