
// ===============================
// INERTIA SYSTEM (SMOOTH MOTION CORE)
// ===============================

let current = 0;
let target = 0;
let ease = 0.075;

window.addEventListener("scroll", () => {
  target = window.scrollY;
});

function smoothScroll() {
  current += (target - current) * ease;
  document.body.style.transform = `translateY(${-current}px)`;
  requestAnimationFrame(smoothScroll);
}
smoothScroll();


// ===============================
// CURSOR SPOTLIGHT (REAL GLOW FOLLOW)
// ===============================

const cursor = document.querySelector(".cursor");

let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function cursorAnim() {
  pos.x += (mouse.x - pos.x) * 0.12;
  pos.y += (mouse.y - pos.y) * 0.12;

  cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1.2)`;
  requestAnimationFrame(cursorAnim);
}
cursorAnim();


// ===============================
// 3D CARD TILT (LIGHTING EFFECT)
// ===============================

const cards = document.querySelectorAll(".card, .price, .glass-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -20;
    const rotateY = ((x / rect.width) - 0.5) * 20;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});


// ===============================
// SCROLL REVEAL (STAGGERED)
// ===============================

const revealItems = document.querySelectorAll("section, .card, .price");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = "1s cubic-bezier(.2,.9,.2,1)";
      }, i * 80);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(60px)";
  observer.observe(el);
});


// ===============================
// MOUSE SPOTLIGHT BACKGROUND
// ===============================

const spotlight = document.createElement("div");
spotlight.style.position = "fixed";
spotlight.style.width = "400px";
spotlight.style.height = "400px";
spotlight.style.borderRadius = "50%";
spotlight.style.background = "radial-gradient(circle, rgba(0,210,255,0.2), transparent 60%)";
spotlight.style.pointerEvents = "none";
spotlight.style.zIndex = "-1";
document.body.appendChild(spotlight);

document.addEventListener("mousemove", (e) => {
  spotlight.style.left = e.clientX - 200 + "px";
  spotlight.style.top = e.clientY - 200 + "px";
});


// ===============================
// PARALLAX DEPTH SYSTEM
// ===============================

document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  if (hero) {
    hero.style.transform = `translate(${x}px, ${y}px)`;
  }
});


// ===============================
// MESH GRADIENT ANIMATION BACKGROUND
// ===============================

const mesh = document.createElement("div");
mesh.style.position = "fixed";
mesh.style.inset = "0";
mesh.style.zIndex = "-3";
mesh.style.background = `
  radial-gradient(circle at 20% 20%, #6c5ce7, transparent 40%),
  radial-gradient(circle at 80% 30%, #00d2ff, transparent 40%),
  radial-gradient(circle at 50% 80%, #ff00cc, transparent 40%)
`;
mesh.style.filter = "blur(80px)";
mesh.style.opacity = "0.4";
document.body.appendChild(mesh);

let t = 0;

function animateMesh() {
  t += 0.002;

  mesh.style.transform = `
    translate(${Math.sin(t) * 30}px, ${Math.cos(t) * 30}px)
    scale(1.1)
  `;

  requestAnimationFrame(animateMesh);
}
animateMesh();


// ===============================
// ACTIVE NAV SCROLL STATE
// ===============================

const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 200;

  sections.forEach((sec, i) => {
    if (
      scrollPos >= sec.offsetTop &&
      scrollPos < sec.offsetTop + sec.offsetHeight
    ) {
      links.forEach(l => l.classList.remove("active"));
      if (links[i]) links[i].classList.add("active");
    }
  });
});


// ===============================
// BUTTON MICRO INTERACTION
// ===============================

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.letterSpacing = "2px";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.letterSpacing = "0px";
  });
});
