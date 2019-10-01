"use strict";

/******************************************************************************
Where's the animal?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the animal we're searching for
let targetX;
let targetY;
let targetImage;

// All the images
let decoyImage = [];

// The number of decoys to show on the screen, randomly
// chosen from the images array
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

  // Randomly select an element of the array
  targetImage = random(decoyImage);
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

    // Generate a random number we can use for probability
    let r = random();

    // I'm using h as an independent counter for the probability
    let h = 1;
    for(let j = 0; j < 11; j++){
      // Use the random number to display one of the ten decoy
      // images, each with a 10% chance of being shown
      // Compare the current image with the target
      if(decoyImage[j] != targetImage && r < h / 10){
        let x = random(0, width);
        let y = random(0, height);
        image(decoyImage[j], x, y);
        h++;
      }
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0, width);
  targetY = random(0, height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  // We multiply by a number smaller than 1 to make the image smaller so it's more difficult to find
  image(targetImage, targetX, targetY, targetImage.width * 0.5, targetImage.height * 0.5);
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
    ellipse(targetX, targetY, targetImage.width, targetImage.height);
    image(targetImage, targetX, targetY, random(targetImage.width - (targetImage.width * 0.7), targetImage.width), random(targetImage.height - (targetImage.height * 0.7), targetImage.height));
    textSize(20);
    fill(0);
    text("I hate you!", targetX, targetY + 50);
  }

  // Show the reference image
  fill(255, 50, 50);
  noStroke();
  rect(width - targetImage.width / 2, targetImage.height / 2 + 10, targetImage.width, targetImage.height);
  image(targetImage, width - targetImage.width / 2, targetImage.height / 2, random(targetImage.width - (targetImage.width * 0.7), targetImage.width), random(targetImage.height - (targetImage.height * 0.7), targetImage.height));

  // Caption of the image
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text("pls help :(", width - targetImage.width / 2, targetImage.height * 0.95);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;
    }
  }
}
