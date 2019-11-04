// Enemy
//
// A class that represents an enemy
// that approaches the player slowly to
// attempt to kill him.

class Enemy {
  // constructor
  //
  //
  constructor() {}

  // prepare
  //
  // Sets the initial values for the Enemy's properties
  // Either sets default values or uses the arguments provided
  prepare() {
    // Position
    do {
      this.x = random(-100, width + 100);
    } while (this.x > 0 && this.x < width);
    this.y = random(0, height);

    // Movement
    this.speed = 1;
    // Size
    this.radius = 20;
    // Display
    this.image = random(imgEnemy);
    // Damage
    this.damage = 0.5;
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
    // Chack player overlap
    // Calculate distance from this enemy to the player
    let d = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than their two radius (an overlap)
    if (d < this.radius + player.radius) {
      // Decrease player health by damage value
      player.health -= this.damage;
    }
  }

  // display
  //
  // Draw the enemy
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}