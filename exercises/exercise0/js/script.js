/*****************

Project: Exercise 0
Author: Raúl Oropeza
Description: This is my spiritual self-portrait

******************/

function preload() {

}

function setup() {
  createCanvas(500, 500);
  background(130, 170, 255);
  rectMode(CENTER);
  noStroke();
  fill(110, 150, 255);
  triangle(500, 500, 0, 0, 500, 0);

  // This is my white shirt
  fill(255);
  rect(250, 484, 315, 60);
  ellipse(250, 454, 315, 100);
  stroke(240);
  strokeWeight(2);
  line(150, 480, 150, 500);
  line(350, 480, 350, 500);
  noStroke();

  // This is my neck
  fill(249, 218, 183);
  rect(250, 380, 75, 50);
  ellipse(250, 405, 75, 30);

  // This is my head
  fill(255, 224, 189);
  rect(250, 255, 205, 120);
  //rect(250, 350, 80, 60);
  ellipse(250, 270, 205, 250);
  triangle(352, 315, 330, 350, 330, 315);
  triangle(148, 315, 170, 350, 170, 315);

  // These are my eyes
  fill(255);
  ellipse(205, 273, 50, 50);
  ellipse(295, 273, 50, 50);
  fill(0, 140, 200);
  ellipse(205, 273, 25, 25);
  ellipse(295, 273, 25, 25);
  fill(0);
  ellipse(205, 273, 10, 10);
  ellipse(295, 273, 10, 10);

  // This is my hair
  fill('#73542D');
  triangle(138, 170, 190, 170, 147, 250);
  rect(255, 170, 210, 50);
  triangle(300, 145, 353, 255, 366, 145);

  // These are my eyebrows
  rect(205, 252, 55, 10);
  rect(295, 242, 55, 10);

  // This is my mouth
  fill(227,93,106);
  rect(250, 345, 55, 4);
}

function draw() {

}
