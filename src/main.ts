import "./css/_index.css";
import "./components/layout";
import "./components/router";
import "./components/pages";
import type { AppRouter } from "./components/router";

// -- mount app --
document.querySelector("#app") ||
  document.body.insertAdjacentHTML("beforeend", '<div id="app"></div>');
const appMount = document.querySelector<HTMLDivElement>("#app");
if (appMount) appMount.innerHTML = "<app-layout></app-layout>";

// -- setup router --
const router = document.createElement("app-router") as AppRouter;
router.setup(
  {
    "/": "home-page",
    "/about": "about-page",
    "/uses": "uses-page",
    "/links": "links-page",
  },
  "/",
);
document.body.appendChild(router);

// --- ripple canvas setup ---
const rippleCanvas = document.createElement("canvas");
Object.assign(rippleCanvas.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  pointerEvents: "none",
  zIndex: "0",
});
document.body.insertBefore(rippleCanvas, document.getElementById("app"));

function resizeCanvas() {
  rippleCanvas.width = window.innerWidth;
  rippleCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// --- glow state ---
let targetX = 0.5;
let targetY = 0.5;
let glowX = 0.5;
let glowY = 0.5;
let glowRadius = 60;
let targetRadius = 60;
let pulse = 0;

// --- ripple state ---
type Ripple = { x: number; y: number; r: number; alpha: number };
const ripples: Ripple[] = [];

// --- color per page ---
const pageGlowColors: Record<string, string> = {
  "/": "#a259ff33",
  "/about": "#59ffa233",
  "/uses": "#59caff33",
  "/contact": "#ff59a233",
};
function getGlowColor() {
  return pageGlowColors[window.location.pathname] || "#a259ff33";
}

// --- event handlers ---
function setGlowRadius(r: number) {
  targetRadius = r;
}
document.addEventListener("mousemove", (e) => {
  targetX = e.clientX / window.innerWidth;
  targetY = e.clientY / window.innerHeight;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") targetX = Math.max(0, targetX - 0.05);
  if (e.key === "ArrowRight") targetX = Math.min(1, targetX + 0.05);
  if (e.key === "ArrowUp") targetY = Math.max(0, targetY - 0.05);
  if (e.key === "ArrowDown") targetY = Math.min(1, targetY + 0.05);
});

for (const evt of ["mouseover", "mousedown", "mouseup", "mouseout"]) {
  document.addEventListener(evt, (e) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    if (evt === "mouseover") setGlowRadius(30);
    if (evt === "mousedown") setGlowRadius(18);
    if (evt === "mouseup") setGlowRadius(30);
    if (evt === "mouseout") setGlowRadius(60);
  });
}

document.addEventListener("click", (e) => {
  ripples.push({
    x: e.clientX / window.innerWidth,
    y: e.clientY / window.innerHeight,
    r: 0,
    alpha: 0.4,
  });
});

// --- ripple drawing ---
function drawRipples() {
  const ctx = rippleCanvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);
  for (const ripple of ripples) {
    const px = ripple.x * rippleCanvas.width;
    const py = ripple.y * rippleCanvas.height;
    const radius = 40 + ripple.r * 8;
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius);
    gradient.addColorStop(0, `rgba(162,89,255,${ripple.alpha})`);
    gradient.addColorStop(1, "rgba(162,89,255,0)");
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

// --- animation loop ---
function animate() {
  // update glow
  pulse += 0.03;
  const pulseRadius = glowRadius + Math.sin(pulse) * 4;
  glowX += (targetX - glowX) * 0.04;
  glowY += (targetY - glowY) * 0.04;
  glowRadius += (targetRadius - glowRadius) * 0.09;

  // update ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];
    ripple.r += 1.5;
    ripple.alpha *= 0.96;
    if (ripple.alpha < 0.01) ripples.splice(i, 1);
  }
  drawRipples();

  // update css background for glow/grid
  document.body.style.background = `
    radial-gradient(circle at ${glowX * 100}% ${glowY * 100}%, ${getGlowColor()} 0%, transparent ${pulseRadius}%),
    radial-gradient(var(--border) 1px, transparent 1px),
    var(--bg)
  `;
  document.body.style.backgroundSize = "auto, 24px 24px, auto";

  requestAnimationFrame(animate);
}
animate();
