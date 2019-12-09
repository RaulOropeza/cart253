/********************************************

  A player that can take the form of any
  image you want, how incredible is that!
  For this game, the player will be the
  legendary robot "Murph", from Muse's
  Simulation Theory Tour.

  The player is affected by gravity so
  you have to keep it jumping to avoid
  the obstacles.

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
    this.imagePath = loadImage(imagePath);
  }

  liftPlayer() {
    this.velocity += this.lift;
  }

  // Move the player towards the current direction
  movePlayer() {
    // Keep player on canvas and make it fall
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height);
  }

  // Display the player
  display() {
    push();
    imageMode(CENTER);
    image(this.imagePath, this.x, this.y, this.size, this.size);
    pop();
  }
}