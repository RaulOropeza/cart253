/********************************************

  A simple player

********************************************/

class Player {
  // Default values for each obstacle
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = 0;
    this.angleIncrement = 0.1;
    this.distToMouseY;
  }

  // Determine where the player is going to move
  handleInput() {
    // Limit the mouse variable to stay within the canvas
    mouseY = constrain(mouseY, 0, height);
    // Calculate the distance between mouse Y position and the player
    this.distToMouseY = mouseY - player.y;
    // Transform the angle of rotation based on how far the mouse is from the player
    player.angle = map(this.distToMouseY, -height / 2, height / 2, -60, 60);
  }

  // Move the player towards the current direction
  movePlayer() {
    let vy = player.speed * sin(player.angle);
    player.y += vy;
  }

  // Display the player
  display() {
    push();
    translate(player.x, player.y);
    // It's easier for me to work with degrees
    angleMode(DEGREES);
    rotate(player.angle);
    stroke(255);
    strokeWeight(4);
    noFill();
    smooth();
    triangle(-20, -25, -20, 25, 25, 0);
    pop();
  }
}