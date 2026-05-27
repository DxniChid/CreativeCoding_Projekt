// FIXED NASA MOON – CLEAN REALISTIC VERSION (p5.js WEBGL)
// --------------------------------------------------------
// Drag mouse: rotate camera (orbitControl)
// Scroll: zoom
// Clean smooth moon surface (NO POINT CLOUDS)

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(0);

  // camera control
  orbitControl();

  // lighting (sun)
  directionalLight(255, 255, 255, -1, -0.3, -1);
  ambientLight(40);

  // slow rotation for cinematic feel
  rotateY(frameCount * 0.002);
  rotateX(0.2);

  // moon material
  ambientMaterial(180);
  specularMaterial(200);
  shininess(5);

  // MAIN MOON (smooth sphere)
  sphere(220, 120, 120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}