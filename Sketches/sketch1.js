let stars = [];
let speed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 600; i++) {
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      z: random(width)
    });
  }
}

function draw() {
  background(0);

  // Steuerung Maus
  let offsetX = map(mouseX, 0, width, -2, 2);
  let offsetY = map(mouseY, 0, height, -2, 2);

  translate(width / 2, height / 2);

  for (let s of stars) {
    s.z -= speed;
    s.x += offsetX;
    s.y += offsetY;

    if (s.z < 1) {
      s.z = width;
      s.x = random(-width, width);
      s.y = random(-height, height);
    }

    let sx = (s.x / s.z) * width;
    let sy = (s.y / s.z) * height;

    let r = map(s.z, 0, width, 6, 0);

    noStroke();
    fill(255);
    ellipse(sx, sy, r);
  }
}

function mousePressed() {
  speed += 2;
  if (speed > 20) speed = 5;
}