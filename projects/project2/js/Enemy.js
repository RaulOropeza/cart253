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
}