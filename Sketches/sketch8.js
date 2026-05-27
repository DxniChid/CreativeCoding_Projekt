let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 300; i++) {
    flowers.push({
      x: random(width),
      y: random(height),
      s: random(20, 80),
      o: random(TWO_PI)
    });
  }
}

function draw() {
  background(5, 5, 20, 20);

  translate(width / 2, height / 2);

  for (let f of flowers) {

    let x =
      f.x - width / 2 +
      sin(frameCount * 0.01 + f.o) * 80;

    let y =
      f.y - height / 2 +
      cos(frameCount * 0.01 + f.o) * 80;

    push();

    translate(x, y);

    rotate(
      sin(frameCount * 0.01 + f.o) * 4
    );

    for (let i = 0; i < 12; i++) {

      rotate(TWO_PI / 12);

      fill(
        200 + sin(i + frameCount * 0.03) * 55,
        100,
        255,
        80
      );

      ellipse(
        0,
        f.s * 0.3,
        f.s * 0.4,
        f.s
      );
    }

    fill(255, 220, 100);
    circle(0, 0, f.s * 0.25);

    pop();
  }
}