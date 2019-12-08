/********************************************

  A simple player

********************************************/

class Player {
  // Default values for each obstacle
  constructor(x, y, size, imagePath) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = 0;
    this.gravity = 0.8;
    this.lift = -20;
    /*this.angle = 0;
    this.angleIncrement = 0.1;
    this.distToMouseY;*/
    this.imagePath = loadImage(imagePath);
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
    this.velocity *= 0.9;
    this.y += this.velocity;

    this.y = constrain(this.y, 0, height);
    //this.velocity = constrain(this.velocity, -15, 15);
    //console.log(this.velocity);
    /*let vy = this.velocity * this.angle;
    this.y *= 1.02;*/
  }

  // Display the player
  display() {
    push();
    imageMode(CENTER);
    image(this.imagePath, this.x, this.y, this.size, this.size);
    /*
    translate(this.x, this.y);
    // It's easier for me to work with degrees
    angleMode(DEGREES);
    rotate(this.angle);
    stroke(255);
    strokeWeight(4);
    noFill();
    smooth();
    triangle(-20, -25, -20, 25, 25, 0);*/
    pop();
  }
}