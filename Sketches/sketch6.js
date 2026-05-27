let zoom;
let cRe = -0.7;
let cIm = 0.27015;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noStroke();
  pixelDensity(1);

  zoom = width / 3;
}

function draw() {
  background(0, 0, 0, 0.25);

  // subtle animation of Julia parameter (makes it alive)
  let t = frameCount * 0.003;
  cRe = -0.7 + sin(t) * 0.2;
  cIm = 0.27015 + cos(t) * 0.2;

  let step = 10;

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {

      let zx = (x - width / 2) / zoom;
      let zy = (y - height / 2) / zoom;

      let i = 0;
      let maxIter = 70;

      while (i < maxIter) {
        let xt = zx * zx - zy * zy + cRe;
        zy = 2 * zx * zy + cIm;
        zx = xt;

        if (zx * zx + zy * zy > 16) break;

        i++;
      }

      let n = i / maxIter;

      // only boundary zone becomes flowers
      if (n > 0.3 && n < 0.95) {
        let hue = map(n, 0.3, 0.95, 180, 360);

        push();
        translate(x, y);

        drawFlower(step * (1.2 - n), hue, n);

        pop();
      }
    }
  }
}
function drawFlower(s, hue, n) {
  fill(hue, 80, 100, 0.9);

  let petals = int(map(n, 0.3, 1, 5, 12));

  for (let i = 0; i < petals; i++) {
    let a = TWO_PI / petals * i;

    ellipse(
      cos(a) * s,
      sin(a) * s,
      s * 0.8,
      s * 1.4
    );
  }

  // glowing center
  fill(hue, 40, 100, 1);
  ellipse(0, 0, s * 0.5);
}