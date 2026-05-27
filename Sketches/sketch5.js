function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
}

function draw() {

  background(10, 10, 30);

  for (let x = 0; x < width; x += 80) {
    for (let y = 0; y < height; y += 80) {

      push();

      translate(x, y);

      rotate(
        sin(frameCount * 0.02 + x * 0.01) * PI
      );

      let petals = 6;

      for (let i = 0; i < petals; i++) {

        rotate(TWO_PI / petals);

        let pulse =
          sin(frameCount * 0.05 + x * 0.02 + y * 0.02);

        fill(
          180 + pulse * 80,
          120,
          255,
          120
        );

        ellipse(
          0,
          20 + pulse * 10,
          20,
          50
        );
      }

      fill(255, 220, 120);
      circle(0, 0, 20);

      pop();
    }
  }
}