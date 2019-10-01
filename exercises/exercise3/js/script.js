"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;

// The ten decoy images
let decoyImage = [];

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;

// Speed and velocity of the target when found
let targetSpeed = 5;
let targetVx = 0;
let targetVy = 0;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  // We call all the images at once into the array, like the pros
  for(let i = 0; i < 11; i++){
    decoyImage[i] = loadImage("assets/images/animals-" + nf(i, 2, 0) + ".png");
  }
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  rectMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0, width);
    let y = random(0, height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage[1], x, y);
    } else if (r < 0.2) {
      image(decoyImage[2], x, y);
    } else if (r < 0.3) {
      image(decoyImage[3], x, y);
    } else if (r < 0.4) {
      image(decoyImage[4], x, y);
    } else if (r < 0.5) {
      image(decoyImage[5], x, y);
    } else if (r < 0.6) {
      image(decoyImage[6], x, y);
    } else if (r < 0.7) {
      image(decoyImage[7], x, y);
    } else if (r < 0.8) {
      image(decoyImage[8], x, y);
    } else if (r < 0.9) {
      image(decoyImage[9], x, y);
    } else if (r < 1.0) {
      image(decoyImage[10], x, y);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0, width);
  targetY = random(0, height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  // We multiply by a number smaller than 1 to make the image smaller so it's more difficult to find
  image(decoyImage[0], targetX, targetY, decoyImage[0].width * 0.5, decoyImage[0].height * 0.5);
}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU WINNED!", width / 2, height / 2);

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    fill(255);
    stroke(random(255));
    strokeWeight(10);
    // Add movement to the target when found
    targetVx = targetSpeed;

    targetX += targetVx;
    targetY += targetVy;
    ellipse(targetX, targetY, decoyImage[0].width, decoyImage[0].height);
    image(decoyImage[0], targetX, targetY, random(decoyImage[0].width - (decoyImage[0].width * 0.7), decoyImage[0].width), random(decoyImage[0].height - (decoyImage[0].height * 0.7), decoyImage[0].height));
    textSize(20);
    fill(0);
    text("I hate you!", targetX, targetY + 50);
  }

  // Show the reference image
  fill(255, 50, 50);
  noStroke();
  rect(width - decoyImage[0].width / 2, decoyImage[0].height / 2 + 10, decoyImage[0].width, decoyImage[0].height);
  image(decoyImage[0], width - decoyImage[0].width / 2, decoyImage[0].height / 2, random(decoyImage[0].width - (decoyImage[0].width * 0.7), decoyImage[0].width), random(decoyImage[0].height - (decoyImage[0].height * 0.7), decoyImage[0].height));

  // Caption of the image
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text("pls help :(", width - decoyImage[0].width / 2, decoyImage[0].height * 0.95);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - decoyImage[0].width / 2 && mouseX < targetX + decoyImage[0].width / 2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - decoyImage[0].height / 2 && mouseY < targetY + decoyImage[0].height / 2) {
      gameOver = true;
    }
  }
}
