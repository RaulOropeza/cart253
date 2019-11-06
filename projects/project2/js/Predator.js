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
  constructor(x, y, speed, image, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Speed
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.image = image;
    // Variables to calculate distance between mouse and player
    this.distToMouseX;
    this.distToMouseY;
    // Score
    this.score = 0;
    // Check if player's moving
    this.isMoving = true;
  }

  // -- Since I set the controller to be the bouse position, I got rid of the handleInput method

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Set the ratio at which the player's movement will slow as it gets close to the cursor based on the current speed
    this.speed = constrain(this.speed, 1, 20);
    this.movementEasing = map(this.speed, 0, 20, 0, 0.055);
    // Calculate distance between mouse position and the player
    this.distToMouseX = mouseX - this.x;
    this.distToMouseY = mouseY - this.y;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Stop movement with key pressed
    if (!keyIsDown(17)) { // CTRL key
      // Update position
      this.x += this.distToMouseX * this.movementEasing;
      this.y += this.distToMouseY * this.movementEasing;
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
    // Game Over conditional
    if (this.health <= 0) {
      currentScreen = 2;
    }
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
    // Check if the distance is less than their two radius (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
        // Increase score
        this.score++;
        // Increase laser speed
        laser.speed += 1;
        // Play sound
        sndScore.play();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    // Health bar
    noStroke();
    fill(255, 150);
    rect(this.x - this.maxHealth, this.y + 8 + this.maxHealth, this.maxHealth * 2, 10);
    fill(255);
    rect(this.x - this.maxHealth, this.y + 8 + this.maxHealth, this.health * 2, 10);
    pop();
  }
}