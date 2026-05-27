const field = document.getElementById("field");

const COLORS = [
  "#ff4fd8",
  "#00ffd5",
  "#7c4dff",
  "#fff07a",
  "#ff7a00",
  "#ff3b3b"
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createFlower() {
  const flower = document.createElement("div");
  flower.className = "flower";

  const x = rand(0, window.innerWidth);
  const size = rand(0.7, 1.6);
  const height = rand(80, 220);

  flower.style.left = x + "px";
  flower.style.transform = `scale(${size})`;

  // Stem
  const stem = document.createElement("div");
  stem.className = "stem";
  stem.style.setProperty("--h", height + "px");

  // blooming effect
  const bloom = document.createElement("div");
  bloom.className = "bloom";
  bloom.style.setProperty("--h", height + "px");

  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  const petals = 7 + Math.floor(Math.random() * 4);

  for (let i = 0; i < petals; i++) {
    const p = document.createElement("div");
    p.className = "petal";

    const angle = (i / petals) * Math.PI * 2;
    const radius = rand(10, 18);

    p.style.setProperty("--c", color);

    p.style.transform = `
      rotate(${angle}rad)
      translate(${radius}px, -10px)
    `;

    bloom.appendChild(p);
  }

  flower.appendChild(stem);
  flower.appendChild(bloom);

  field.appendChild(flower);

  // sparkles
  for (let i = 0; i < 5; i++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = x + rand(-20, 20) + "px";
    s.style.bottom = rand(0, 100) + "px";
    s.style.animationDelay = rand(0, 2) + "s";

    field.appendChild(s);
  }
}

// generate field slowly
for (let i = 0; i < 40; i++) {
  setTimeout(createFlower, i * 150);
}

// growing infinitely
setInterval(() => {
  createFlower();
}, 600);