/*****************

Song Drifter
by Raúl Oropeza

For now is just a basic graphical representation
of a sample sound amplitude.

******************/

let player = {
  angle: 0,
  speed: 6,
  angleIncrement: 0.1,
  x: 0,
  y: 0,
}
let distToMouseY;

// Variables for sound
let song;
let amp;
let volumeHistory = [];
let volumeDisplay = [];
let waveSpeed = 0;

let testRect;

function preload() {
  song = loadSound("assets/sounds/Algorithm.mp3");
  amp = new p5.Amplitude();
}

// Create canvas and set initial position of the player
function setup() {
  createCanvas(500, 500);
  player.x = 50;
  player.y = height / 2;
  mouseY = height / 2;
  testRect = new Obstacle(width, height, 10, 0);
}


// Call all functions
function draw() {
  background(0);
  handleInput();
  moveplayer();
  drawplayer();
  displaySound();
}

// Interact with sound
function displaySound() {
  let vol = amp.getLevel();
  testRect.height = map(vol, 0, 1, 0, height);
  testRect.display();
  testRect.move();

  /*
  // Add current volume to history
  volumeHistory.push(vol);
  stroke(255);
  noFill();
  waveSpeed--;
  // Draw a shape with different points
  beginShape();
  for (let i = 0; i < volumeHistory.length; i++) {
    volumeDisplay[i] = volumeHistory[i];
    // Calculate X position substracting i to width to make it move from right to left
    var x = width + i + waveSpeed;
    var y = map(volumeDisplay[i], 0, 0.7, height, 0);
    vertex(x, y);
  }
  endShape();

  // Overwrite the array from the begining
  if (x < 0) volumeHistory.splice(0, 1);
  //ellipse(width / 2, height / 2, vol * 200, vol * 200);*/
}

// Determine where the player is going to move
function handleInput() {
  // Limit the mouse variable to stay within the canvas
  mouseY = constrain(mouseY, 0, height);
  // Calculate the distance between mouse Y position and the player
  distToMouseY = mouseY - player.y;
  // Transform the angle of rotation based on how far the mouse is from the player
  player.angle = map(distToMouseY, -height / 2, height / 2, -60, 60);
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
  // It's easier for me to work with degrees
  angleMode(DEGREES);
  rotate(player.angle);
  noStroke();
  fill(255, 255, 0);
  triangle(-20, -25, -20, 25, 25, 0);
  fill(0);
  triangle(-17, -20, -17, 20, 19, 0);
  pop();
}

// Toogle song on and off
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

// Instructions for when mouse is pressed
function mousePressed() {
  toggleSong();
}