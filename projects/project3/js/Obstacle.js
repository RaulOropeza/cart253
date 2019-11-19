class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 2;
  }

  move() {
    this.x -= this.speed;
  }

  display() {
    push();
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}