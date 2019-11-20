/********************************************

  Obstacles that will take the form of sound
  and detect when the player touches them

********************************************/

class Obstacle {
  // Default values for each obstacle
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  // Check if the player has crashed with an obstacle
  checkCollision() {
    if (player.x > this.x && player.x < this.x + this.width) {
      if (player.y < this.y && player.y > this.y + this.height) {
        console.log("Oopsie doopsie!");
      }
    }
  }

  // Display the obstacle
  display() {
    push();
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}