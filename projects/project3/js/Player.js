/********************************************

  A simple player

********************************************/

class Player {
  // Default values for each obstacle
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.gravity = 0.4;
    this.lift = -10;
    this.angle = 0;
    this.angleIncrement = 0.1;
    this.distToMouseY;
  }

  // Determine where the player is going to move
  handleInput() {
    // Limit the mouse variable to stay within the canvas
    //mouseY = constrain(mouseY, 0, height);


    // Calculate the distance between mouse Y position and the player
    //this.distToMouseY = mouseY - this.y;
    // Transform the angle of rotation based on how far the mouse is from the player
    //this.angle = map(this.distToMouseY, -height / 2, height / 2, -60, 60);

    /*this.angle++;
    this.angle = constrain(this.angle, -60, 90);*/
  }

  liftPlayer() {
    this.velocity += this.lift;
  }

  // Move the player towards the current direction
  movePlayer() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    this.y = constrain(this.y, 0, height);
    this.velocity = constrain(this.velocity, -10, 10);
    console.log(this.velocity);

    if (this.y > height) {
      //this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      //this.y = 0;
      this.velocity = 0;
    }
    /*let vy = this.velocity * this.angle;
    this.y *= 1.02;*/
  }

  // Display the player
  display() {
    push();
    translate(this.x, this.y);
    // It's easier for me to work with degrees
    angleMode(DEGREES);
    rotate(this.angle);
    stroke(255);
    strokeWeight(4);
    noFill();
    smooth();
    triangle(-20, -25, -20, 25, 25, 0);
    pop();
  }
}