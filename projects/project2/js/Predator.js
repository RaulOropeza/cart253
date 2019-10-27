// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Variables to calculate distance between mouse and player
    this.distToMouseX;
    this.distToMouseY;
  }

  // -- Since I set the controller to be the bouse position, I got rid of the handleInput method

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Set the ratio at wich tha player's movement will slow as it gets close to the cursor based on the current speed
    this.movementEasing = map(this.speed, 0, 10, 0, 0.2);
    // Calculate distance between mouse position and the player
    this.distToMouseX = mouseX - this.x;
    this.distToMouseY = mouseY - this.y;
    // Update position
    this.x += this.distToMouseX * this.movementEasing;
    this.y += this.distToMouseY * this.movementEasing;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
  }

  // -- I got rid of the handleWrapping method too
  // -- I'm tearing this code apart hahaha! what about the next method? I wonder if I can...

  // handleEating
  //
  // -- Hmmm... let's see what you do
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset. (pls don't kill me :c)
  //
  // -- Alright, you can stay.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}