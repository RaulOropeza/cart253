// Projectile
//
// A class that represents the projectiles that
// the player can throw at preys

class Projectile {
  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(radius, speed) {
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.speed = speed;
    this.fillColor = color(random(255), random(255), random(255));
  }

  display() {
    push();
    ellipseMode(CENTER);
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}