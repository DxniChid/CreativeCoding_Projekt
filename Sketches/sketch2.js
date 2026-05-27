let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  // Sonne

  fill(255, 200, 0);
  noStroke();
  ellipse(0, 0, 80);

  // Planet 1

  push();
  rotate(angle);
  translate(120, 0);
  fill(100, 150, 255);
  ellipse(0, 0, 30);
  pop();

  // Planet 2

  push();
  rotate(-angle * 1.5);
  translate(200, 0);
  fill(255, 100, 150);
  ellipse(0, 0, 50);
  pop();

  angle += 0.01;

  
  
}