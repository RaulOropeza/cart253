// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

//*R Comments made by me (Raúl) will start with "*R", just like this one.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//*R The current position and size of the yellow rectangle
let rectX;
let rectY;
let rectWidth = 20;
let rectHeight = 40;

// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  //*R Start the rectangle off the left side of the canvas
  //*R The negative width divided by two is to make sure it's first drawn outside the canvas
  //*R We divide the height by 2 to start drawing in the middle of the canvas
  rectX = -rectWidth/2;
  rectY = height/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //R* Move the rectangle to the right
  rectX++;
  //R* I see a rectangle and I want it painted black ♪♪♪
  fill(0, 10);
  //R* Display the rectangle
  rect(rectX, rectY, rectWidth, rectHeight);
}
