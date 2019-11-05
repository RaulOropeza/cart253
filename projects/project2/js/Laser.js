// Laser
//
// A class that represents a deadly laser
// that the player can shoot to the enemies.

class Laser {
  // constructor
  //
  // Set the property for the predator and the speed
  constructor(predator) {
    this.predator = predator;
    // Speed
    this.speed = 1;
  }

  // calibrate
  //
  // Set the coordinates to shoot the laser
  calibrate(originX, originY, targetX, targetY) {
    // Starting coordinates
    this.originX = originX;
    this.originY = originY;
    // Target coordinates
    this.targetX = targetX;
    this.targetY = targetY;
    // Current position of the laser
    this.currentX = originX;
    this.currentY = originY;
    // Default color
    this.color = color(255, 0, 0);
    // Play laser sound
    sndLaser.play();
  }

  // shoot
  //
  // Display the laser along with its fancy animation
  shoot(color) {
    // Set the ratio at which the laser's movement will slow as it gets close to the its target based on the current speed
    this.speed = constrain(this.speed, 1, 20);
    this.movementEasing = map(this.speed, 0, 20, 0, 0.18);
    // Calculate the distance between the current position of the laser and the target
    this.distToTargetX = this.targetX - this.currentX;
    this.distToTargetY = this.targetY - this.currentY;
    // Update position
    this.currentX += this.distToTargetX * this.movementEasing;
    this.currentY += this.distToTargetY * this.movementEasing;
    // Visual style of the laser
    this.color = color;
    push();
    strokeWeight(14);
    stroke(this.color);
    line(this.originX, this.originY, this.currentX, this.currentY);
    strokeWeight(8);
    stroke(255, 150);
    line(this.originX, this.originY, this.currentX, this.currentY);
    strokeWeight(4);
    stroke(255);
    line(this.originX, this.originY, this.currentX, this.currentY);
    pop();
  }

  // checkTargetHit
  //
  // If the laser hits the enemy, it destroys him
  checkTargetHit(enemy) {
    if (this.currentX > enemy.x - enemy.radius && this.currentX < enemy.x + enemy.radius) {
      if (this.currentY > enemy.y - enemy.radius && this.currentY < enemy.y + enemy.radius) {
        enemy.prepare();
        // Increase predator speed
        this.predator.speed += 0.1;
        // Playe enemy death sound
        sndEnemyDeath.play();
      }
    }
  }
}