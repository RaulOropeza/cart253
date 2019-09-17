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

//*R The current position and size of John Lennon
let johnImg;
let johnX;
let johnY;
let johnSize;

//*R The current position of the prism
//*R Size is not needed here, I want to use its original size
let prismImg;
let prismX;
let prismY;

//*R The current size of the javascript logo
let jsLogoImg;
let jsLogoX;
let jsLogoY;

//*R The current angle, speed and scale of the sine wave
let sineAngle;
let sineSpeed;
let sineScale;

//R* The current offset to draw the sine wave
let sineOffset;

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

  //*R Set the file path for John's head
  johnImg = loadImage("assets/images/john.png");
  //*R Set the size for John
  johnSize = 80;

  //*R Set the file path for the prism
  prismImg = loadImage("assets/images/prism.png");
  //*R Start the prism at the top of the canvas
  //*R We divide the width by 2 to start drawing in the center of the canvas
  //*R I'm using the negative value of the image's height divided by 2 to start it off the canvas
  prismX = width/2;
  prismY = -prismImg.height/2;

  //*R Set the file path for the javascript logo
  jsLogoImg = loadImage("assets/images/jsLogo.png");
  //*R I'm using the negative value of the image's width divided by 2 to start it off the canvas
  //*R I want to start drawing the logo at 7/8 of the height
  jsLogoX = -jsLogoImg.width/2;

  //*R Set the values for the sine wave
  sineSpeed = 0.03;
  sineAngle = 0.0;
  sineScale = 80;
  //*R Set the offset to draw the sine wave, this is the value that the wave is going to "orbit"
  sineOffset = 500;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  //*R We'll draw images from the center
  imageMode(CENTER);
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

  //*R Move the rectangle to the right
  rectX++;
  //*R I see a rectangle and I want it painted black ♪♪♪
  fill(0, 10);
  //*R Display the rectangle
  rect(rectX, rectY, rectWidth, rectHeight);

  //*R Fool John into thinking that the cursor is Yoko
  johnX = mouseX;
  johnY = mouseY;
  //*R Make John look like a ghost
  tint(0, 255, 255, 10);
  //*R Add John Lennon to the matrix
  image(johnImg, johnX, johnY, johnSize);

  //*R Reset the tint
  tint(255);
  //*R Move the prism towards the bottom
  prismY++;
  //*R Draw the prism
  image(prismImg, prismX, prismY);

  //*R Move the js logo in a sine wave, the numb
  jsLogoY = sineOffset + sin(sineAngle) * sineScale;
  jsLogoX++;
  sineAngle+= sineSpeed;
  //*R Draw the js logo
  image(jsLogoImg, jsLogoX, jsLogoY);
}
