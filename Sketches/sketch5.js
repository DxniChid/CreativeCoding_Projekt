// Speed decreases or increases based on clicks


let flowers = [];
let speed = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  for (let i = 0; i < 500; i++) {
    flowers.push({
      x: random(-width, width),
      y: random(-height, height),
      z: random(width),
      hue: random(360)
    });
  }
}

function draw() {
  background(165, 255, 255);

  let offsetX = map(mouseX, 0, width, -2, 2);
  let offsetY = map(mouseY, 0, height, -2, 2);

  translate(width / 2, height / 2);

  for (let f of flowers) {

    // movement in depth
    f.z -= speed;
    f.x += offsetX;
    f.y += offsetY;

    // reset when passed camera
    if (f.z < 1) {
      f.z = width;
      f.x = random(-width, width);
      f.y = random(-height, height);
      f.hue = random(360);
    }

    // perspective projection
    let sx = (f.x / f.z) * width;
    let sy = (f.y / f.z) * height;

    let size = map(f.z, 0, width, 40, 2);

    push();
    translate(sx, sy);

    drawFlower(size, f.hue);

    pop();
  }
}

function drawFlower(s, hue) {
  noStroke();
  fill(hue, 80, 100, 0.9);

  // petals
  for (let i = 0; i < 6; i++) {
    let a = TWO_PI / 6 * i;

    ellipse(
      cos(a) * s * 0.6,
      sin(a) * s * 0.6,
      s * 0.6,
      s * 0.9
    );
  }

  // center
  fill(hue, 40, 100);
  ellipse(0, 0, s * 0.5);
}

function mousePressed() {
  speed += 2;
  if (speed > 20) speed = 4;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}