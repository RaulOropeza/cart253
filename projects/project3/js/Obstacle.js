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
  checkCollisionOne() {
    if (player.x + player.size / 2 > this.x && player.x - player.size / 2 < this.x + this.width) {
      if (player.y + player.size / 2 > this.y && player.y - player.size / 2 < this.y + this.height) {
        currentState = 1;
      }
    }
  }

  // Check if the player has crashed with an obstacle
  checkCollisionTwo() {
    if (player.x + player.size / 2 > this.x && player.x - player.size / 2 < this.x + this.width) {
      if (player.y - player.size / 2 < this.y && player.y + player.size / 2 > this.y + this.height) {
        currentState = 1;
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