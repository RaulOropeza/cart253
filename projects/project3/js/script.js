/*****************

Song Drifter
by Raúl Oropeza

For now is just a basic graphical representation
of a sample sound amplitude.

******************/

let player = {
  angle: 0,
  speed: 6,
  x: 0,
  y: 0,
}

function preload() {

}

// Create canvas and set initial position of the player
function setup() {
  createCanvas(500, 500);
  player.x = 80;
  player.y = height / 2;

}


// Call all functions
function draw() {
  background(0);
  handleInput();
  moveplayer();
  drawplayer();
}

// Determine where the player is going to move
function handleInput() {
  // Only vertical movement
  if (keyIsDown(UP_ARROW)) {
    player.angle -= 0.1;
  } else if (keyIsDown(DOWN_ARROW)) {
    player.angle += 0.1;
  }
  // Constrain angle to the positive x axis
  player.angle = constrain(player.angle, -0.8, 0.8);
}

// Move the player towards the current direction
function moveplayer() {
  // The magic lines for calculating velocity!
  let vy = player.speed * sin(player.angle);
  player.y += vy;
}

// Draw the player as a yellow triangle
function drawplayer() {
  push();
  translate(player.x, player.y);
  rotate(player.angle);
  noStroke();
  fill(255, 255, 0);
  triangle(0, 0, -45, -25, -45, 25); // The anchor point is on the first point (0, 0)
  fill(0);
  triangle(-4, 0, -42, -20, -42, 20);
  pop();
}