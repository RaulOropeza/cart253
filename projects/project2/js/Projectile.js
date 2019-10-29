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
    this.shooting = false;
  }

  shoot(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;

    this.endX = endX;
    this.endY = endY;

    this.x = this.startX;
    this.y = this.startY;

    this.shooting = true;
  }

  display() {
    this.movementEasing = map(this.speed, 0, 10, 0, 0.5);

    if (this.shooting) {

      this.distToEndX = this.endX - this.startX;
      this.distToEndY = this.endY - this.startY;

      this.x += this.distToEndX * this.movementEasing;
      this.y += this.distToEndY * this.movementEasing;

      push();
      ellipseMode(CENTER);
      noStroke();
      fill(this.fillColor);
      ellipse(this.x, this.y, this.radius * 2);
      pop();
    } else {
      this.shooting = false;
    }
  }
}