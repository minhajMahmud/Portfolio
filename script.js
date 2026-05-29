/* ============================================
   PORTFOLIO SCRIPT — Mohammad Mahmudul Hasan
   ============================================ */

"use strict";

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const body = document.querySelector("body");
let theme = localStorage.getItem("theme") || "dark";

function applyTheme(t) {
  if (t === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

applyTheme(theme);

themeBtn.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle("open", menuOpen);
  menu.classList.toggle("active", menuOpen);
});

// Close menu on nav link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    hamburger.classList.remove("open");
    menu.classList.remove("active");
  });
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (menuOpen && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menuOpen = false;
    hamburger.classList.remove("open");
    menu.classList.remove("active");
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect on interactive elements
document.querySelectorAll("a, button, .project-card, .skill-category, .cp-card, .ach-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursorFollower.style.opacity = "0.2";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    cursorFollower.style.opacity = "0.5";
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${id}`) {
            link.style.color = "var(--accent)";
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== SKILL TAG TILT EFFECT =====
document.querySelectorAll(".skill-category").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * 5;
    const rotY = ((x - cx) / cx) * -5;
    card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ===== PROJECT CARD PARALLAX =====
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * 4;
    const rotY = ((x - cx) / cx) * -4;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ===== TYPING ANIMATION FOR CODE CARD =====
const typingEl = document.querySelector(".typing-code");
if (typingEl) {
  const text = '"open to work 🚀"';
  typingEl.textContent = "";
  let i = 0;
  const typeInterval = setInterval(() => {
    typingEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeInterval);
  }, 80);
}

// ===== GLITCH EFFECT ON LOGO =====
const logoName = document.querySelector(".logo-name");
if (logoName) {
  logoName.addEventListener("mouseenter", () => {
    logoName.style.animation = "glitch 0.3s ease";
    setTimeout(() => (logoName.style.animation = ""), 300);
  });
}

// Inject glitch keyframes
const style = document.createElement("style");
style.textContent = `
  @keyframes glitch {
    0%   { text-shadow: 2px 0 #63b3ed, -2px 0 #7ee8a2; }
    25%  { text-shadow: -2px 0 #63b3ed, 2px 0 #7ee8a2; }
    50%  { text-shadow: 2px 2px #63b3ed, -2px -2px #7ee8a2; }
    75%  { text-shadow: 0 -2px #63b3ed, 0 2px #7ee8a2; }
    100% { text-shadow: none; }
  }
`;
document.head.appendChild(style);

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement("div");
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px; z-index: 9000;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  transition: width 0.1s ease; width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});

// ===== PARTICLE BACKGROUND (HERO) =====
const canvas = document.createElement("canvas");
canvas.id = "particles";
canvas.style.cssText = `
  position: absolute; top: 0; left: 0; pointer-events: none;
  width: 100%; height: 100%; opacity: 0.4; z-index: 0;
`;
const heroSection = document.querySelector(".section-1");
if (heroSection) {
  heroSection.style.position = "relative";
  heroSection.appendChild(canvas);
}

const ctx = canvas.getContext("2d");
let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  if (heroSection) {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99,179,237,${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,179,237,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== STAGGER REVEAL ON PAGE LOAD =====
window.addEventListener("load", () => {
  document.querySelectorAll(".section-1 .reveal-up, .section-1 .reveal-right").forEach((el, i) => {
    setTimeout(() => el.classList.add("revealed"), i * 60 + 80);
  });
});

// ===== ANIMATED CHARACTER INTERACTIONS =====
const animatedChar = document.getElementById("animatedChar");
const speechBubble = document.getElementById('speechBubble');
const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (animatedChar) {
  // make the character slightly look towards cursor
  document.addEventListener('mousemove', (e) => {
    const rect = animatedChar.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const tiltX = Math.max(Math.min(dx * 6, 10), -10);
    const tiltY = Math.max(Math.min(dy * 4, 6), -6);
    animatedChar.style.transform = `translateY(-6px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
  });

  animatedChar.addEventListener('mouseenter', () => {
    // trigger a friendly wave by toggling arm animation class
    const arm = animatedChar.querySelector('#arm-right');
    if (arm) {
      arm.style.animation = 'waveArm 0.9s ease-in-out 0s 3';
      setTimeout(() => (arm.style.animation = ''), 3000);
    }
  });
}

// speech bubble helper
let speechTimeout = null;
function showSpeech(text = 'Hey there!', duration = 3000) {
  if (!speechBubble) return;
  speechBubble.textContent = text;
  speechBubble.classList.add('show');
  clearTimeout(speechTimeout);
  speechTimeout = setTimeout(() => speechBubble.classList.remove('show'), duration);
}

// idle behaviors (periodic speech + wave) unless user prefers reduced motion
if (!prefersReduced && animatedChar) {
  const phrases = ["Hey there! 👋","Ask me about my projects","I ♥ building apps","Open to collaborations"];
  setTimeout(() => showSpeech(phrases[0], 2500), 1500);
  setInterval(() => {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    showSpeech(phrase, 2600);
    // small automatic wave
    const arm = animatedChar.querySelector('#arm-right');
    if (arm) {
      arm.style.animation = 'waveArm 0.8s ease-in-out 0s 2';
      setTimeout(() => (arm.style.animation = ''), 1600);
    }
  }, 9000 + Math.floor(Math.random() * 4000));
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.title = 'Back to top';
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('show'); else backToTop.classList.remove('show');
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// hide placeholders when images load
document.querySelectorAll('.project-img img').forEach((img) => {
  img.addEventListener('load', () => {
    const ph = img.parentElement.querySelector('.img-placeholder');
    if (ph) ph.style.display = 'none';
  });
  img.addEventListener('error', () => {
    // keep placeholder visible on error
  });
});