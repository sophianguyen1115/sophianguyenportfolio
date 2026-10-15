// ---- Projects (edit this array to update the site) ----
const projects = [
  {name:"Scraps", tags:"Full Stack · Desktop & Mobile", desc:"AI visual thinking canvas, 0→1 for creatives.", url:"https://joinscraps.com"},
  {name:"DemoStudio", tags:"Full Stack · FFmpeg", desc:"Make better-looking software product demos. #7 on Product Hunt, 2500+ users."},
  {name:"Zen Editor", tags:"UX of AI · Diffing algorithms", desc:"AI document editor that syncs with Google Drive."},
  {name:"NotetakingLM", tags:"Weekend project · UX of AI", desc:"Designing a Graph-RAG, LLM-based notetaking workflow."},
  {name:"Capsule", tags:"Hackathon · UX of AI", desc:"1st place at Rice Designathon 2025. Digital journaling as a hunter-gatherer process."},
  {name:"Whatarethechords.com", tags:"3-hour project · Full Stack", desc:"Search agent for guitar chords. 15k+ queries run."},
  {name:"iMessage Polls Concept", tags:"2-day project · Concept design", desc:"Polls for group chats using Apple's design system."},
  {name:"Grapevine", tags:"Blockchain · Prediction market", desc:"Community prediction market built on Solidity, Hardhat and Chainlink."}
];
const grid = document.getElementById("projects");
for (const p of projects) {
  const el = document.createElement(p.url ? "a" : "article");
  el.className = "card";
  if (p.url) { el.href = p.url; el.style.textDecoration = "none"; }
  el.innerHTML = `<div class="thumb" aria-hidden="true">${p.name[0]}</div>
    <div class="body"><h3></h3><p class="tags"></p><p class="desc"></p></div>`;
  el.querySelector("h3").textContent = p.name;
  el.querySelector(".tags").textContent = p.tags;
  el.querySelector(".desc").textContent = p.desc;
  grid.appendChild(el);
}

// ---- Pond: tap to make ripples ----
const canvas = document.getElementById("pond");
const ctx = canvas.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let w, h, dpr, ripples = [];
function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  w = canvas.clientWidth; h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", resize); resize();
function add(x, y) { ripples.push({x, y, r: 0, a: 0.6}); }
canvas.addEventListener("pointerdown", e => {
  const b = canvas.getBoundingClientRect(); add(e.clientX - b.left, e.clientY - b.top);
});
canvas.addEventListener("pointermove", e => {
  if (e.buttons || e.pointerType === "mouse" && Math.random() < 0.03) {
    const b = canvas.getBoundingClientRect(); add(e.clientX - b.left, e.clientY - b.top);
  }
});
const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
function frame() {
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1.5; ctx.strokeStyle = ink();
  ripples = ripples.filter(p => p.a > 0.01);
  for (const p of ripples) {
    p.r += reduce ? 2 : 1.6; p.a *= 0.985;
    ctx.globalAlpha = p.a;
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, p.r - i * 14), 0, 7); ctx.stroke(); }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
frame();
