/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position, size and image of our avatar
let avatarImg;
let avatarX;
let avatarY;
let avatarSize = 80;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position, size and image of the enemy
let enemyImg;
let enemyX;
let enemyY;
let enemySize = 50;

// The size and image of the alternate enemy
let enemyAltImg;
let enemyAltSize;

// The size of the alt enemy in relation of the normal enemy
let enemyAltProportion = 1.3;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

// The amount the enemy increases its size and speed on every dodge
let enemySizeIncrease = 2;
let enemySpeedIncrease = 0.2;

// How many dodges the player has made
let dodges = 0;

// The image for the background
let bgImg;

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  bgImg = loadImage('assets/images/space_bg.jpg');

  // Set a file for the avatar image
  avatarImg = loadImage('assets/images/death_star.png');

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;
  imageMode(CENTER);

  // Set a file for the enemy
  enemyImg = loadImage('assets/images/x-wing.gif');

  // Set the file for the alternate enemy
  enemyAltImg = loadImage('assets/images/y-wing.png');

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // An outer space background
  image(bgImg, width/2, height/2);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the size and speed of the enemy
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the size and speed of the enemy
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);

    // Increase the size and speed of the enemy
    enemySize+= enemySizeIncrease;
    enemySpeed+= enemySpeedIncrease;
    console.log("The current size of the enemy is: " + enemySize);
    console.log("The current speed of the enemy is: " + enemySpeed);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is black
  fill(0);
  // Draw the player as the Death Star
  image(avatarImg, avatarX,avatarY,avatarSize,avatarSize);

  // Every 5 successful dodges make a big Y-Wing will appear
  if(dodges % 5 === 0 && dodges != 0){
    enemyAltSize = enemySize * enemyAltProportion;
    // Draw the enemy as a Y-Wing
    image(enemyAltImg, enemyX,enemyY,enemyAltSize, enemyAltSize);
  }else {
    // Draw the enemy as an X-Wing
    image(enemyImg, enemyX,enemyY,enemySize,enemySize);
  }

  // Display the score
  textSize(30);
  fill(255, 230, 0);
  textFont("Impact");
  text(dodges, 10, 30);
}
