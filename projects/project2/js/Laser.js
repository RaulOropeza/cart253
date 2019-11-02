class Laser {
  constructor(color) {
    this.color = color;
  }

  shoot(originX, originY, targetX, targetY) {
    push();
    strokeWeight(12);
    stroke(this.color);
    line(originX, originY, targetX, targetY);
    strokeWeight(8);
    stroke(255, 150);
    line(originX, originY, targetX, targetY);
    strokeWeight(4);
    stroke(255);
    line(originX, originY, targetX, targetY);
    pop();
  }
}