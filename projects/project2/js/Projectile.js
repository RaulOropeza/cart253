// Projectile
//
// A class that represents the projectiles that
// the player can throw at preys

class Projectile {
  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(predator, radius, speed) {
    this.predator = predator;
    this.radius = radius;
    this.speed = speed;
    this.x = predator.x;
    this.y = predator.y;
  }

  display() {
    // Set the ratio at which the projectile's movement will slow as it gets close to the cursor based on the current speed
    // this.movementEasing = map(this.speed, 0, 10, 0, 0.5);
    if (this.x >= 0 && this.x <= width && this.y >= 0 && this.x <= height) {
      // Update position
      this.x += Math.sign(this.predator.distToMouseX);
      this.y += Math.sign(this.predator.distToMouseY);
      console.log(Math.sign(this.predator.distToMouseX) + " - " + Math.sign(this.predator.distToMouseY));
      push();
      ellipseMode(CENTER);
      noStroke();
      fill(random(255), random(255), random(255));
      ellipse(this.x, this.y, this.radius * 2);
      pop();
    } else {
      this.x = this.predator.distToMouseX;
      this.y = this.predator.distToMouseY;
    }
  }
}