// Projectile
//
// A class that represents the projectiles that
// the player can throw at preys

class Projectile {
  // constructor
  //
  // Sets the initial values for the Projectile's properties
  // Either sets default values or uses the arguments provided
  constructor(radius, speed, fillColor) {
    // Position
    this.x = 0;
    this.y = 0;
    // Size and movement
    this.radius = radius;
    this.speed = speed;
    // Display
    this.fillColor = fillColor;
    // Detect when it's been shot
    this.shooting = false;
  }

  // This is the method by which the projectile can be called
  // It needs a starting position and a direction
  shoot(startX, startY, dirX, dirY) {
    // Activate shooting only if the projectile is off the canvas
    //if (!this.shooting) {
    // Define the starting position
    this.startX = startX;
    this.startY = startY;
    // Define the direction
    this.dirX = dirX;
    this.dirY = dirY;
    // Calculate the slope
    this.m = (dirY - startY) / (dirX - startX);
    console.log(this.m);
    // Set position displaying values to the starting position
    this.x = this.startX;
    this.y = this.startY;
    // Intersection with y
    this.b = dirY - (this.m * dirX);
    // Start shooting
    this.shooting = true;
    this.distToDirX = this.dirX - this.startX;
    //}
  }

  display() {
    //if (this.shooting) {

    /*
    this.x += this.distToDirX / 15;
    this.y += this.distToDirY / 15;
    */
    this.x += this.distToDirX * 0.5;
    this.y = (this.m * this.x) + this.b;
    push();
    ellipseMode(CENTER);
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
    //}
    // Stop displaying the projectile if it gets off the canvas
    //if (this.x > width || this.x < 0 || this.y > height || this.y < 0) this.shooting = false;
  }
}