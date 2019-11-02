// Enemy
//
// A class that represents an enemy
// that approaches the player slowly to
// attempt to kill him.

class Enemy {
  // constructor
  //
  // Sets the initial values for the Enemy's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed) {
    // Position
    this.x = x;
    this.y = y;
    // Movement
    this.speed = speed;
    // Size
    this.radius = 20;
  }

  // chase
  //
  // Make the enemy follow the player
  chase(player) {
    // Set the ratio at which the enemy's movement will slow as it gets close to the player based on the current speed
    this.movementEasing = map(this.speed, 0, 10, 0, 0.005);
    // Calculate distance between enemy position and the player
    this.distToPlayerX = player.x - this.x;
    this.distToPlayerY = player.y - this.y;
    // Update position
    this.x += this.distToPlayerX * this.movementEasing;
    this.y += this.distToPlayerY * this.movementEasing;
  }

  // display
  //
  // Draw the enemy
  display() {
    push();
    ellipseMode(CENTER);
    fill(random(10, 80));
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}