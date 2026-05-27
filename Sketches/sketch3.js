// Nebula Generator – Perlin Noise Space (p5.js)
// Move mouse to influence nebula flow
// Click to regenerate seed

let inc = 0.01;
let zoff = 0;
let cols, rows;
let scale = 20;
let particles = [];
let flowfield;
let seed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowfield = new Array(cols * rows);

  seed = random(10000);

  for (let i = 0; i < 800; i++) {
    particles[i] = new Particle();
  }

  background(0);
}

function draw() {
  // semi-transparent fade for trails
  background(20, 10);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;

      // Perlin noise field
      let angle = noise(xoff, yoff, zoff + seed) * TWO_PI * 2;

      // mouse influence
      let mx = mouseX / width;
      let my = mouseY / height;
      angle += (mx - 0.5) * 2;

      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);

      flowfield[index] = v;

      xoff += inc;

    }
    yoff += inc;
  }

  zoff += 0.002;

  for (let p of particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  }
}

function mousePressed() {
  seed = random(10000);
  background(0);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prev = this.pos.copy();
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + y * cols;

    let force = vectors[index];
    if (force) this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(120, 180, 255, 20);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    this.prev.set(this.pos);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}
