// Predator-Prey Simulation
// by Pippin Barr and Raúl Oropeza
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let blackhole1;
let blackhole2;

// The four prey
let mars;
let earth;
let venus;
let uranus;
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  blackhole1 = new Predator(100, 100, 5, color(200, 200, 0), 40, 1);
  blackhole2 = new Predator(200, 200, 5, color(120, 180, 0), 40, 2);
  mars = new Prey(100, 100, 10, 1, 60);
  earth = new Prey(100, 100, 8, 2, 100);
  venus = new Prey(100, 100, 20, 3, 80);
  uranus = new Prey(100, 100, 15, 4, 40);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(5, 5, 35);

  // Handle input for the predators
  blackhole1.handleInput();
  blackhole2.handleInput();

  // Move all the "animals"
  blackhole1.move();
  blackhole2.move();
  mars.move();
  earth.move();
  venus.move();
  uranus.move();

  // Handle the blackhole1 eating any of the prey
  blackhole1.handleEating(mars);
  blackhole1.handleEating(earth);
  blackhole1.handleEating(venus);
  blackhole1.handleEating(uranus);

  // Handle the blackhole2 eating any of the prey
  blackhole2.handleEating(mars);
  blackhole2.handleEating(earth);
  blackhole2.handleEating(venus);
  blackhole2.handleEating(uranus);

  // Display all the "animals"
  blackhole1.display();
  blackhole2.display();
  mars.display();
  earth.display();
  venus.display();
  uranus.display();
}